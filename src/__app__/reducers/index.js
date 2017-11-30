/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux-immutable';

import i18nReducer from 'src/__i18n__/reducer';
import appReducer from './app-reducer';
import routeReducer from './route-reducer';

// #if process.env.NODE_ENV === 'development'
/* eslint-disable import/first */
import home from 'src/home/reducer';
//†import
/* eslint-enable import/first */

const devAsyncReducers = {
  home,
  //†reducer
};
// #endif

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    app: appReducer,
    intl: i18nReducer,
    ...asyncReducers,

    // #if process.env.NODE_ENV === 'development'
    ...devAsyncReducers,
    // #endif
  });
}
