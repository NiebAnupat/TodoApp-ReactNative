import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_ERROR_CODE = 'USER_ERROR_CODE';

const checkUserInDB = async email => {
  console.log('checkUserInDB: ', email);
  const user = await firestore()
    .collection('users')
    .where('email', '==', email)
    .get();
  console.log('User is in DB : ', !user.empty);
  return user.empty;
};

export const userLogin = (email, password) => async dispatch => {
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
            dispatch({
              type: USER_LOGIN,
              payload: {user: auth().currentUser.uid},
            });
            dispatch({
              type: USER_ERROR_CODE,
              payload: {errorCode: ''},
            });
          })
          .catch(error => {
            dispatch({
              type: USER_ERROR_CODE,
              payload: {errorCode: error.code},
            });
          });
      } else {
        dispatch({
          type: USER_LOGIN,
          payload: {user: auth().currentUser.uid},
        });
        dispatch({
          type: USER_ERROR_CODE,
          payload: {errorCode: ''},
        });
      }
    })
    .catch(error => {
      dispatch({
        type: USER_ERROR_CODE,
        payload: {errorCode: error.code},
      });
    });
};

export const userLogout = () => dispatch => {
  auth()
    .signOut()
    .then(() => {
      console.log('User logged out successfully');
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
        firestore()
          .collection('users')
          .add({
            email: email,
            password: password,
          })
          .then(() => {
            console.log('User saved');
          })
          .catch(error => {
            dispatch({
              type: USER_ERROR_CODE,
              payload: {errorCode: error.code},
            });
          });

        console.log('register success....');
      })
      .catch(error => {
        dispatch({
          type: USER_ERROR_CODE,
          payload: {errorCode: error.code},
        });
      });
  } else {
    console.log('Password is not match');
  }
};

export const userErrorCode = errorCode => dispatch => {
  dispatch({
    type: USER_ERROR_CODE,
    payload: {errorCode: errorCode},
  });
};
