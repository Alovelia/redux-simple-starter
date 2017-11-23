import { fromJS } from 'immutable';

import {
  selectIntl,
  makeSelectLanguage,
  makeSelectLocale,
  makeSelectMessages,
} from '../selectors';

describe('selectIntl', () => {
  it('should select the intl state', () => {
    const intlState = fromJS({
      language: 'en',
    });
    const mockedState = fromJS({
      intl: intlState,
    });
    expect(selectIntl(mockedState)).toEqual(intlState);
  });
});

describe('makeSelectLanguage', () => {
  const languageSelector = makeSelectLanguage();
  it('should select the language', () => {
    const language = 'en';
    const intlState = fromJS({
      language,
    });
    const mockedState = fromJS({
      intl: intlState,
    });
    expect(languageSelector(mockedState)).toEqual(language);
  });
});

describe('makeSelectLocale', () => {
  const localeSelector = makeSelectLocale();
  it('should select the locale', () => {
    const locale = 'en';
    const intlState = fromJS({
      locale,
    });
    const mockedState = fromJS({
      intl: intlState,
    });
    expect(localeSelector(mockedState)).toEqual(locale);
  });
});

describe('makeSelectMessages', () => {
  const messagesSelector = makeSelectMessages();
  it('should select message', () => {
    const messages = { id: 1 };
    const intlState = fromJS({
      messages,
    });
    const mockedState = fromJS({
      intl: intlState,
    });
    expect(messagesSelector(mockedState)).toEqual(messages);
  });
});
