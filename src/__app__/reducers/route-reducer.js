import { constants, actions } from 'ducks-helpers';
import handleActions from 'redux-actions/lib/handleActions';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'common/helpers';

export const TYPE = constants('route', [
  //†type
]);
export const ACTION = actions(TYPE);

// Initial routing state
const initialState = _.fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
export default handleActions({
  [LOCATION_CHANGE]: updateLocation,
  //†handler
}, initialState);

/*
 * routeReducer
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 */
export function updateLocation(state, { payload }) {
  return state.merge({
    locationBeforeTransitions: payload,
  });
}
//†reducer
