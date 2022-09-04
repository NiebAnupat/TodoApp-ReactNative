import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const TOGGLE_SIGN_OUT = 'TOGGLE_SIGN_OUT';
export const TOGGLE_SIGN_UP = 'TOGGLE_SIGN_UP';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

const checkUserInDB = async (email) => {
	console.log('checkUserInDB: ', email);
	const user = await firestore()
		.collection('users')
		.where('email', '==', email)
		.get();
	console.log('User is in DB : ', !user.empty);
	return user.empty;
};

export const userLogin = (email, password) => async (dispatch) => {
	return new Promise(async (resolve, reject) => {
		if (auth().currentUser) await auth().signOut();
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(async () => {
				if (await checkUserInDB(email)) {
					console.log('User is not registered\nSaving user...');
					firestore()
						.collection('users')
						.doc(auth().currentUser.uid)
						.set({
							email: email,
							password: password,
						})
						.then(() => {
							console.log('User saved');
							resolve();
						})
						.catch((error) => {
							reject(error.code);
						});
				}
			})
			.catch((error) => {
				reject(error.code);
			});
	});
};

export const toggelSignOut = () => (dispatch) => {
	dispatch({ type: TOGGLE_SIGN_OUT });
};

export const userLogout = () => (dispatch) => {
	auth()
		.signOut()
		.then(() => {
			console.log('User logged out successfully');
		})
		.catch((error) => {
			console.log(error);
		});
};

export const toggelSignUp = () => (dispatch) => {
	dispatch({ type: TOGGLE_SIGN_UP });
};

export const signUpErrorMsg = (msg) => (dispatch) => {
	dispatch({ type: SIGN_UP_ERROR, payload: msg });
};

export const userSignUp = (email, password, username) => async (dispatch) => {
	try {
		await auth().createUserWithEmailAndPassword(email, password);
		console.log('User created successfully');
		console.log('Update user data');
		await auth().currentUser.updateProfile({
			displayName: username,
		});
		console.log('User data updated');

		console.log('Saving user...');
		await firestore().collection('users').doc(auth().currentUser.uid).set({
			email: email,
			password: password,
		});
		console.log('User saved');
		console.log('register success....');
		userLogout();
	} catch (error) {
		throw error;
	}
};

export const forgotPasswordErrorMsg = (msg) => (dispatch) => {
	dispatch({ type: FORGOT_PASSWORD_ERROR, payload: msg });
};

export const userForgotPassword = (email) => async (dispatch) => {
	try {
		await auth().sendPasswordResetEmail(email);
		console.log('Email sended');
	} catch (error) {
		console.log('thow error');
		throw error;
	}
};
