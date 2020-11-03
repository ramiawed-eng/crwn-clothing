import ShopTypes from './shop.types';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.util';

export const updateCollections = (collectionsMap) => ({
  type: ShopTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});

export const fetchColllectionsStart = () => ({
  type: ShopTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// using thunk
export const fetchCollectionStartAsync = () => {
  return (dispatch) => {
    const collectionRefs = firestore.collection('collections');
    dispatch(fetchColllectionsStart());

    collectionRefs
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
