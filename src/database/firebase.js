import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyAxAC39l6JQXPWBXlWkbmrm1eqPxsvhS98',
  authDomain: 'todoapp-reactnative-41f88.firebaseapp.com',
  projectId: 'todoapp-reactnative-41f88',
  storageBucket: 'todoapp-reactnative-41f88.appspot.com',
  messagingSenderId: '130557397192',
  appId: '1:130557397192:web:a0a5b6300d3866ac53fdfd',
  measurementId: 'G-6HRMB5C2CX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export default {firestore, auth};
