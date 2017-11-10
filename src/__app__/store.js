import { createStore, applyMiddleware } from 'redux';
/* eslint-disable no-redeclare */
// #if process.env.NODE_ENV === 'development'
import { composeWithDevTools } from 'redux-devtools-extension';
// #endif
// #if process.env.NODE_ENV !== 'development'
// using dev-tools in production
// https://medium.com/@zalmoxis/using-redux-devtools-in-production-4c5b56c5600f
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
// #endif
/* eslint-enable no-redeclare */
import { routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';
// import { persistState } from 'redux-devtools';
// import DevTools from '../containers/DevTools';
// import { loadState, saveState } from '/common/local-storage-module';
// saga
// import throttle from 'lodash/throttle';
// import createSagaMiddleware from 'redux-saga';

// const sagaMiddleware = createSagaMiddleware();
// import sagas from '../sagas';

import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    // sagaMiddleware,
    routerMiddleware(history),
  ];

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
    composeEnhancers(...enhancers)
  );

  // substribe localStorage save method to state change event
  // store.subscribe(throttle(() =>{
  // I can save only particular modules such as saveState({notes: store.getState().notes})
  // saveState(store.getState())
  // },1000))

  //run saga
  // sagaMiddleware.run(sagas);

  // Extensions
  // store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('./reducers', async () => {
      const reducerModule = await import('./reducers');
      const createReducers = reducerModule;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
    });
  }

  return store;
}
