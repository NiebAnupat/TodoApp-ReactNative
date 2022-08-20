import {
  ADD_TODO,
  REMOVE_TODO,
  CLEAR_TODO,
  TOGGLE_TODO,
  TOGGLE_LOADING,
  CLEAR_COMPLETED
} from './actions';
import todoItem from '../../models/todoItem';

const initialState = {
  todos: [],
  isLoading: false,
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {...state, todos: [...state.todos, action.payload]};

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.getId() !== action.payload),
      };

    case CLEAR_COMPLETED : {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.isCompleted()),
      };
    }
    case CLEAR_TODO: {
      return {...state, todos: []};
    }
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
    case TOGGLE_LOADING: {
      return {...state, isLoading: action.payload};
    }

    default:
      return state;
  }
}

export default todoReducer;
