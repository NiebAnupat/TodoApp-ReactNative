import {USER_LOGIN, USER_LOGOUT, USER_CONFIRM_PASSWORD_IS_CORRECT} from './actions';

const initialState = {
  email: '',
  password: '',
  user : null,
  isLoggedIn: false,
  confirmPasswordIsCorrect: null,
  errorMessage: ''
};

function userRuducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN: {
      return {...state, ...action.payload, isLoggedIn: true};
    }
    case USER_LOGOUT:
      return {...state, ...action.payload, isLoggedIn: false};
    case USER_CONFIRM_PASSWORD_IS_CORRECT : {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
}

export default userRuducer;
