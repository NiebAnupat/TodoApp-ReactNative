// import {firestore, auth} from '../../database/firebase';
import auth from '@react-native-firebase/auth';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_CONFIRM_PASSWORD_IS_CORRECT =
  'USER_CONFIRM_PASSWORD_IS_CORRECT';
export const USER_ERROR_MESSAGE = 'USER_ERROR_MESSAGE';

export const userLogin = (email, password) => dispatch => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({
        type: USER_LOGIN,
        payload: {user: auth().currentUser},
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const userLogout = () => dispatch => {
  auth()
    .signOut()
    .then(() => {
      dispatch({
        type: USER_LOGOUT,
        payload: {user: null},
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const userRegister = (email, password, confirmPassword) => dispatch => {
  if (password === confirmPassword) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('register success....');
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    console.log('Password is not match');
    dispatch({
      type: USER_CONFIRM_PASSWORD_IS_CORRECT,
      payload: {confirmPasswordIsCorrect: false},
    });
  }
};
