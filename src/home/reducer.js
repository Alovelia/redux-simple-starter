import { constants, actions } from 'ducks-helpers';
import handleActions from 'redux-actions/lib/handleActions';
import _ from 'common/helpers';

export const TYPE = constants('home', [
  '~GET',
  //†type
]);
export const ACTION = actions(TYPE);

// The initial state
const initialState = _.fromJS({});

export default handleActions({
  [TYPE.GET_SUCCESS]: (state) => {
    return state.set('ajaxWorks', true);
  }
  //†handler
}, initialState);

//†reducer