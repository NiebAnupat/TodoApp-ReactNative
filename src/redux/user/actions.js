import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const TOGGLE_SIGN_OUT = 'TOGGLE_SIGN_OUT';
export const TOGGLE_SIGN_UP = 'TOGGLE_SIGN_UP';

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

export const userSignUp = (email, password, username) => (dispatch) => {
	return new Promise((resolve, reject) => {
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				console.log('User created successfully');

				console.log('Update user data');
				auth()
					.currentUser.updateProfile({
						displayName: username,
					})
					.then(() => {
						console.log('User data updated');
					})
					.catch((error) => {
						console.log(error);
					});

				console.log('Saving user...');
				firestore()
					.collection('users')
					.add({
						email: email,
						password: password,
					})
					.then(() => {
						console.log('User saved');
					})
					.catch((error) => {
						console.log(error);
					});
				console.log('register success....');
				userLogout();
				resolve();
			})
			.catch((error) => {
				reject(error.code);
			});
	});
};

export const userForgotPassword = (email) => {
	return new Promise((resolve, reject) => {
		auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				console.log('Email sent');
				resolve();
			})
			.catch((error) => {
				reject(error.code);
			});
	});
};
