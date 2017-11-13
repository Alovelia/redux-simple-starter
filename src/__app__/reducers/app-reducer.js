import { constants, actions } from 'ducks-helpers';
import handleActions from 'redux-actions/lib/handleActions';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'common/helpers';
import { routingConfig, DEFAULT_PAGE } from '../routes-config';

export const TYPE = constants('app', [
  //†type
]);
export const ACTION = actions(TYPE);

// The initial state of the App
const initialState = _.fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  permissions: [],
  activePage: {},
});

export default handleActions({
  [LOCATION_CHANGE]: updateLocation,
  //†handler
}, initialState);

/*
* It's important part - here routing information is set
* This data is used by Helmet to update document.title
* */
export function updateLocation(state, { payload }) {
  const currentPage = routingConfig[payload.pathname.slice(1) || DEFAULT_PAGE] || {};
  return state.set('activePage', _.fromJS(currentPage));
}
//†reducer
