import todoItem from '../../models/todoItem';

export const SET_TITLE = 'SET_TITLE';
export const CLEAR_TITLE = 'CLEAR_TITLE';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const setTitle = title => dispatch => {
  dispatch({
    type: SET_TITLE,
    payload: title,
  });
};

export const claerTitle = () => dispatch => {
  dispatch({
    type: CLEAR_TITLE,
    payload: '',
  });
};

export const addTodo = title => dispatch => {
  dispatch({
    type: ADD_TODO,
    payload: new todoItem(title),
  });
};

export const removeTodo = TodoID => dispatch => {
  dispatch({
    type: REMOVE_TODO,
    payload: TodoID,
  });
};

export const toggleTodo = TodoID => dispatch => {
  dispatch({
    type: TOGGLE_TODO,
    payload: TodoID,
  });
};
