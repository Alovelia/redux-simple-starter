import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import sagas from './sagas';

const composeWithDevTools =
  process.env.NODE_ENV === 'development'
    ? require('redux-devtools-extension').composeWithDevTools
    : require('redux-devtools-extension/logOnlyInProduction')
        .composeWithDevTools;

// import { persistState } from 'redux-devtools';
// import DevTools from '../containers/DevTools';
// import { loadState, saveState } from '/common/local-storage-module';
// saga
// import throttle from 'lodash/throttle';
// import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

  const enhancers = [
    applyMiddleware(...middlewares),
    // , DevTools.instrument()
    // , persistState(
    //   window.location.href.match(
    //     /[?&]debug_session=([^&#]+)\b/
    //   )
    // )
    // ,window.devToolsExtension ? window.devToolsExtension() : f => f
  ];

  const store = createStore(
    createReducer(),
    // such method can be used only here not in enhancer
    // see how implement it as middleware
    // https://github.com/elgerlambert/redux-localstorage/blob/master/src/persistState.js
    // loadState() || initialState // load from localStorage
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // substribe localStorage save method to state change event
  // store.subscribe(throttle(() =>{
  // I can save only particular modules such as saveState({notes: store.getState().notes})
  // saveState(store.getState())
  // },1000))

  //run saga
  let sagaProcess = sagaMiddleware.run(sagas);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // #if process.env.NODE_ENV === 'development'
  // Make reducers hot reloadable, see http://mxs.is/googmo
  const reloadReducers = async () => {
    const createReducers = await import('./reducers');
    const nextReducers = createReducers(store.injectedReducers);
    store.replaceReducer(nextReducers);
  };

  // https://stackoverflow.com/a/40783428/6190198
  const reloadSagas = async () => {
    const getNewSagas = await import('./sagas');
    sagaProcess.cancel();
    sagaProcess.done.then(() => {
      sagaProcess = sagaMiddleware.run(function* replacedSaga() {
        yield getNewSagas();
      });
    });
  };

  if (module.hot) {
    module.hot.accept('./reducers', reloadReducers);
    module.hot.accept('./sagas', reloadSagas);
  }
  // #endif

  return store;
}
