import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBm_nZhqenvkwP_N-p8suEFjkOHU00R92A',
  authDomain: 'crwn-db-11e2b.firebaseapp.com',
  databaseURL: 'https://crwn-db-11e2b.firebaseio.com',
  projectId: 'crwn-db-11e2b',
  storageBucket: 'crwn-db-11e2b.appspot.com',
  messagingSenderId: '653188101886',
  appId: '1:653188101886:web:9bfa361c6b78c269c097af',
  measurementId: 'G-5YEJRYGHGZ',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ login_hint: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
