import {
	TOGGLE_SIGN_OUT,
	TOGGLE_SIGN_UP,
	SIGN_UP_ERROR,
	FORGOT_PASSWORD_ERROR,
} from './actions';

const initialState = {
	isNotSignUp: true,
	isSignOut: false,
	SignUpError: null,
	ForgotPasswordError: null,
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
		case SIGN_UP_ERROR:
			return {
				...state,
				SignUpError: action.payload,
			};
		case FORGOT_PASSWORD_ERROR:
			return {
				...state,
				ForgotPasswordError: action.payload,
			};

		default:
			return state;
	}
}

export default userRuducer;
