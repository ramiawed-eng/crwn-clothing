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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    // we want to get the document at an empty string,
    // this will tell firebaset to give me a new document
    // reference in this collection, and randomly
    // generate an id for me
    const documentRef = collectionRef.doc();
    batch.set(documentRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumalator, collection) => {
    accumalator[collection.title.toLowerCase()] = collection;
    return accumalator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
