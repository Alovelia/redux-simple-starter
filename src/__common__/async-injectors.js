import createReducer from 'app/reducers'; // horizontal dependency. But it reduces amount of boilerplate
// #if process.env.NODE_ENV === 'development'
import conformsTo from 'lodash/fp/conformsTo';
import isEmpty from 'lodash/fp/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/fp/isObject';
import isString from 'lodash/fp/isString';
import invariant from 'invariant';
import warning from 'warning';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(shape)(store),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
}
// #endif

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store) {
  return function injectReducer(name, asyncReducer) {
    // #if process.env.NODE_ENV === 'development'
    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );
    // #endif

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store) {
  return function injectSagas(sagas) {
    // #if process.env.NODE_ENV === 'development'
    invariant(
      Array.isArray(sagas),
      '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    );

    warning(
      !isEmpty(sagas),
      '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
    );
    // #endif

    sagas.forEach(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  // #if process.env.NODE_ENV === 'development'
  checkStore(store);
  // #endif

  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store),
  };
}
