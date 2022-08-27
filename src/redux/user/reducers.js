import { TOGGLE_SIGN_OUT, TOGGLE_SIGN_UP } from './actions';

const initialState = {
	isNotSignUp: true,
	isSignOut: false,
};

function userRuducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SIGN_OUT:
			return {
				...state,
				isSignOut: state.isSignOut ? false : true,
			};

		case TOGGLE_SIGN_UP:
			return {
				...state,
				isNotSignUp: state.isNotSignUp ? false : true,
			};
		default:
			return state;
	}
}

export default userRuducer;
