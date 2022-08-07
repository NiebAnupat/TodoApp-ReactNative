import todoItem from '../../models/todoItem';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'uuid-random';
import userRuducer from '../user/reducers';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const CLEAR_TODO = 'CLEAR_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

let userUid = !!auth().currentUser ? auth().currentUser.uid : '';
// console.log('userUid: ', userUid);
// const userUid = auth().currentUser.uid;
// const userUid = () => auth().currentUser.uid;

const todoCollection = firestore()
  .collection('users')
  .doc(userUid)
  .collection('todos');

export const addTodo = title => dispatch => {
  console.log('Add Todo To User : ', userUid);
  const uid = uuid();
  todoCollection
    .doc(uid)
    .set({
      id: uid,
      title: title,
      completed: false,
      timeStame: firestore.Timestamp.now(),
    })
    .then(() => {
      dispatch({
        type: ADD_TODO,
        payload: new todoItem(uid, title, false),
      });
      console.log('Todo added');
    })
    .catch(error => {
      console.log(error);
    });
};

export const clearTodo = () => dispatch => {
  dispatch({
    type: CLEAR_TODO,
  });
};

export const removeTodo = TodoID => dispatch => {
  todoCollection
    .doc(TodoID)
    .delete()
    .then(() => {
      dispatch({
        type: REMOVE_TODO,
        payload: TodoID,
      });
    })
    .catch(error => {
      console.log(error.code);
    });
};

export const toggleTodo = TodoID => dispatch => {
  console.log('Toggle ID : ', TodoID);
  dispatch({
    type: TOGGLE_TODO,
    payload: TodoID,
  });
  todoCollection
    .doc(TodoID)
    .get()
    .then(querySnapshot => {
      const todo = querySnapshot.data();
      todoCollection
        .doc(TodoID)
        .update({
          completed: !todo.completed,
        })
        .then(() => {
          console.log('Toggle Completed');
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error.code);
    });
};

export const fetchTodos = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: TOGGLE_LOADING,
      payload: true,
    });
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('todos')
      .orderBy('timeStame', 'asc')
      .get()
      .then(async snapshot => {
        await snapshot.docs.forEach(doc => {
          dispatch({
            type: ADD_TODO,
            payload: new todoItem(
              doc.data().id,
              doc.data().title,
              doc.data().completed,
            ),
          });
        });
        dispatch({
          type: TOGGLE_LOADING,
          payload: false,
        });
        console.log('fetchTodos success');
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};
