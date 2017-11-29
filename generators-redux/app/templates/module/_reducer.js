import { constants, actions } from 'ducks-helpers';
import handleActions from 'redux-actions/lib/handleActions';
import _ from 'common/helpers';

export const TYPE = constants('<%=name%>', [
  //†type
]);
export const ACTION = actions(TYPE);

export const initialState = _.fromJS({});

export default handleActions({
  //†handler
}, initialState);

//†reducer
