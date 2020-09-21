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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // console.log(firestore.doc('users/128dfdfdfe'));

  //console.log(firestore.doc('user/123jsdsdj23'));

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
