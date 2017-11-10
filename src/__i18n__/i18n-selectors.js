import { createSelector } from 'reselect';

/*
* Select intl object
* */
export const selectIntl = state => state.get('intl');

/**
 * Direct selector to the languageToggle state domain
 */
export const selectLanguage = createSelector(
  selectIntl,
  intl => intl.get('language')
);

/**
 * Select the language locale
 */
export const selectLocale = createSelector(
  selectIntl,
  intl => intl.get('locale')
);

/**
 * Select messages for current language
 */
export const selectMessages = createSelector(
  selectIntl,
  (intl) => {
    const messages = intl.get('messages');
    if (messages) {
      return messages.toJS();
    }
  }
);
