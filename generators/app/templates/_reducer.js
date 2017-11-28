// GLOBAL IMPORTS
import { constants, actions } from 'ducks-helpers';
import { handleActions } from 'redux-actions';

// CUSTOM IMPORTS
//†import

// ACTION TYPES
export const TYPE = constants('<%=moduleName%>/<%=name%>', [
  //†type
]);

// ACTIONS
export const ACTION = actions(TYPE);

// STATE
const INITIAL_STATE = {
  //†prop
};

// REDUCER
export default handleActions({
  //†handler
}, INITIAL_STATE);

// IMPLEMENTATION
//†reducer
