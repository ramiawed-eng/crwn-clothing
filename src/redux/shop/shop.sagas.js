import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from '../../firebase/firebase.util';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.action';

import ShopTypes from './shop.types';

export function* fetchCollectionsStartAsyn() {
  try {
    const collectionRef = firestore.collection('collections');

    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsStartAsyn
  );
}

export function* shopSaga() {
  yield all([call(fetchCollectionsStart)]);
}
