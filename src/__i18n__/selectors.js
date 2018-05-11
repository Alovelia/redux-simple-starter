import { createSelector } from 'reselect';

/*
* Select intl object
* */
export const selectIntl = state => state.get('intl');

/**
 * Select main language
 */
export const makeSelectLanguage = () =>
  createSelector(selectIntl, intl => intl && intl.get('language'));

/**
 * Select the language locale
 */
export const makeSelectLocale = () =>
  createSelector(selectIntl, intl => intl && intl.get('locale'));

/**
 * Select messages for current language
 */
export const makeSelectMessages = () =>
  createSelector(selectIntl, intl => {
    const messages = intl && intl.get('messages');
    if (messages) {
      return messages.toJS();
    }
  });
