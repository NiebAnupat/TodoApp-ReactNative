import todoItem from '../../models/todoItem';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'uuid-random';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const CLEAR_TODO = 'CLEAR_TODO';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export const addTodo = title => dispatch => {
    console.log('Add Todo To User : ', auth().currentUser.uid);
    const uid = uuid();
    firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('todos')
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

export const clearCompleted = () => dispatch => {
    dispatch({
        type: CLEAR_COMPLETED,
    });

    firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('todos')
        .where('completed', '==', true)
        .get()
        .then(async querySnapshot => {
              await  querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    }
                );

            console.log('Completed Todos cleared');
            }
        );
}

export const clearTodo = () => dispatch => {
    dispatch({
        type: CLEAR_TODO,
    });
};

export const clearTodoInDB = () => dispatch => {
    dispatch({
        type: CLEAR_TODO,
    });

    firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('todos')
        .get()
        .then(async snapshot => {
                await snapshot.forEach(doc => {
                    firestore()
                        .collection('users')
                        .doc(auth().currentUser.uid)
                        .collection('todos')
                        .doc(doc.id)
                        .delete()
                        .catch(error => {
                            console.log(error);
                        });
                });
                console.log('All todos deleted');
            }
        );
}

export const removeTodo = TodoID => dispatch => {
    firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('todos')
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

    firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('todos')
        .doc(TodoID)
        .get()
        .then(querySnapshot => {
            const todo = querySnapshot.data();
            firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('todos')
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
