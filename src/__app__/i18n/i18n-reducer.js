import { fromJS } from 'immutable';
import { constants, actions } from 'ducks-helpers';
import handleActions from 'redux-actions/lib/handleActions';
import { getDefaultSupportedLanguage } from './i18n-core';

export const TYPE = constants('@@intl', [
  'UPDATE_LOCALE',
  'UPDATE_MESSAGES',
  //†type
]);

export const ACTION = actions(TYPE);

export const initialState = fromJS({
  locale: getDefaultSupportedLanguage(),
  messages: {},
});

export default handleActions({
  [TYPE.UPDATE_LOCALE]: updateLocale,
  [TYPE.UPDATE_MESSAGES]: updateMessages,
  //†handler
}, initialState);


export function updateLocale(state, { payload }) {
  return state.set('locale', payload);
}
export function updateMessages(state, { payload }) {
  return state.set('messages', fromJS(payload));
}
//†reducer
