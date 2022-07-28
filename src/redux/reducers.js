// import { React } from 'react';
import {
  SET_TITLE,
  CLEAR_TITLE,
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
} from './actions';
import todoItem from './../models/todoItem';
// import {Toast, Box} from 'native-base';

const initialState = {
  title: '',
  todos: [
    new todoItem('Todo 1'),
    new todoItem('Todo 2'),
    new todoItem('Todo 3'),
    new todoItem('Todo 4'),
  ],
};

// const showWarning = () => {
//   Toast.show({
//     render: () => {
//       return (
//         <Box
//           bg="danger.600"
//           px="2"
//           py="1"
//           rounded="sm"
//           mt={5}
//           _text={{
//             color: 'warmGray.50',
//           }}>
//           กรุณากรอกข้อมูล
//         </Box>
//       );
//     },
//     placement: 'top',
//     status: 'warning',
//   });
//   return {...state, title: ''};
// };

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE: {
      if (action.payload > 0) return {...state, title: action.payload};
      else return {...state, title: ''};
    }
    case CLEAR_TITLE:
      return {...state, title: ''};
    case ADD_TODO:
      return {...state, todos: [...state.todos, action.payload]};

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.getId() !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.getId() === action.payload) {
            todo.setCompleted(!todo.isCompleted());
          }
          return todo;
        }),
      };
    default:
      return state;
  }
}

export default todoReducer;
