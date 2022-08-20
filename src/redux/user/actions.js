import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const TOGGLE_SIGN_OUT = 'TOGGLE_SIGN_OUT';



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
                        .catch(error => {
                            reject(error.code);
                        });
                }
            })
            .catch(error => {
                reject(error.code);
            });
    });
};

export const toggelSignOut = () => {
    return {
        type: TOGGLE_SIGN_OUT,
    };
}

export const userLogout = () => dispatch => {
    auth()
        .signOut()
        .then(() => {
            console.log('User logged out successfully');
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
                        console.log(error);
                    });

                console.log('register success....');
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        console.log('Password is not match');
    }
};
