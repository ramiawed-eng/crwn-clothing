import { takeLatest, call, put, all } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import { cleartCart } from './cart.actions';

export function* clearCartOnSignout() {
  yield put(cleartCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignout);
}

export function* cartSaga() {
  yield all([call(onSignOutSuccess)]);
}
