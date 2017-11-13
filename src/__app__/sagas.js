import { delay } from 'redux-saga';
import { all, call, spawn } from 'redux-saga/effects';
// #if process.env.NODE_ENV === 'development'
import homeSagas from '../home/sagas';
//†import
// #endif

// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = (saga) => {
  return function* sagaRunner() {
    yield spawn(function* restartableSaga() {
      while (true) {
        try {
          yield call(saga);
          // eslint-disable-next-line
          console.error('unexpected root saga termination. ' +
            'The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (e) {
          // eslint-disable-next-line
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
      }
    });
  };
};


const rootSagas = [
  // #if process.env.NODE_ENV === 'development'
  ...homeSagas,
  //†saga
  // #endif
].map(makeRestartable);


export default function* root() {
  // https://github.com/redux-saga/redux-saga/issues/1000#issuecomment-303760253
  yield all([
    ...rootSagas.map(saga => call(saga))
  ]);
}
