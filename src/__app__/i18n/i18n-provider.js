import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { IntlProvider } from 'react-intl';
import { createSelector } from 'reselect';
import _ from 'common/helpers';
import * as i18nSelectors from './i18n-selectors';
import { loadLocaleData, isLocaleSupported } from './i18n-core';
import { ACTION } from './i18n-reducer';

export const I18nProvider = ({
  messages, locale, children
}) => {
  // don't start application until messages are loaded
  return !_.isEmpty(messages)
    ? <IntlProvider
      messages={messages}
      locale={locale}
      key={locale}
    >
      { children }
    </IntlProvider>
    : null;
};

I18nProvider.propTypes = {
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  i18nSelectors.selectLocale,
  i18nSelectors.selectMessages,
  (locale, messages) => ({ locale, messages })
);

export default compose(
  connect(
    mapStateToProps,
    {
      updateMessages: ACTION.updateMessages,
      //†actions
    }
  ),
  lifecycle({
    componentDidMount() {
      const { locale, updateMessages } = this.props;
      loadLocaleData(locale)
        .then(updateMessages);
    }
  })
)(I18nProvider);
