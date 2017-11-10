import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { IntlProvider } from 'react-intl';
import { createSelector } from 'reselect';
import _ from 'common/helpers';
import * as i18nSelectors from './i18n-selectors';
import { loadLocaleData } from './i18n-core';
import { ACTION } from './i18n-reducer';

export const I18nComponent = ({
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

I18nComponent.propTypes = {
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  i18nSelectors.selectLocale,
  i18nSelectors.selectMessages,
  (locale, messages) => ({ locale, messages })
);

export function componentDidMount() {
  const { locale, updateMessages } = this.props;
  loadLocaleData(locale)
    .then(updateMessages);
}

export function componentWillReceiveProps(newProps) {
  const { locale, updateMessages } = this.props;
  const { newLocale } = newProps;

  // locale was changed
  if (newLocale && locale && newLocale !== locale) {
    loadLocaleData(locale)
      .then(updateMessages);
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      updateMessages: ACTION.updateMessages,
      //†actions
    }
  ),
  lifecycle({
    componentDidMount,
    componentWillReceiveProps,
  })
)(I18nComponent);
