import { put, select, takeLatest } from 'redux-saga/effects';
// import { LOCATION_CHANGE } from 'react-router-redux';
import { ACTION, TYPE } from './reducer';
// import axios from 'axios';
import { makeSelectUsername } from './selectors';

/**
 * Github repos request/response handler
 */
export function* getData() {
  // Select username from store
  const username = yield select(makeSelectUsername());

  try {
    // Call ajax
    // const response = yield call(axios, requestURL);
    yield put(ACTION.getSuccess(username));
    yield put({ type: 'CUEEzzzS' });
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
