import {USER_LOGIN, USER_LOGOUT,USER_ERROR_CODE} from './actions';

const initialState = {
  user : null,
  errorCode: ''
};

function userRuducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN: {
      return {...state, ...action.payload};
    }
    case USER_LOGOUT:
      return {...state, ...action.payload};
  
    case USER_ERROR_CODE : {
      return {...state, ...action.payload};
    }
   
    default:
      return state;
  }
}

export default userRuducer;
