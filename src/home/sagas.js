import { call, put, select, takeLatest } from 'redux-saga/effects';
// import { LOCATION_CHANGE } from 'react-router-redux';
import axios from 'axios';
import { ACTION, TYPE } from './reducer';
import { makeSelectUsername } from './selectors';

/**
 * Github repos request/response handler
 */
export function* getData() {
  // Select username from store
  const username = yield select(makeSelectUsername());

  try {
    // Call ajax
    const response = yield call(axios, '/api/mock');
    yield put(ACTION.getSuccess(username));
    yield put({ type: 'SOMETHING_ELSE' });
  } catch (err) {
    yield put(ACTION.getError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getDataSaga() {
  // Watches for action and calls callback when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // const watcher = yield takeLatest(TYPE.GET, getData);
  yield takeLatest(TYPE.GET, getData);

  // Suspend execution until location changes
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

// Bootstrap sagas
export default [
  getDataSaga,
];
