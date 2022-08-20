import {TOGGLE_SIGN_OUT} from './actions';

const initialState = {
  isSignOut: false,
};

function userRuducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIGN_OUT:
      return {
        ...state,
        isSignOut: state.isSignOut ? false : true,
      };
    default: return state;
  }
}

export default userRuducer;
