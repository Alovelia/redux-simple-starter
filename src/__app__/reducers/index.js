/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { combineReducers } from 'redux-immutable';

import appReducer from './app-reducer';
import routeReducer from './route-reducer';
import i18nReducer from '../../__i18n__/i18n-reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    app: appReducer,
    intl: i18nReducer,
    ...asyncReducers,
  });
}
