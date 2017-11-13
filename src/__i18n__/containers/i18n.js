import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { IntlProvider } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import _ from 'common/helpers';
import { makeSelectLocale, makeSelectMessages } from '../selectors';
import { loadLocaleData } from '../core';
import { ACTION } from '../reducer';

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

export function componentDidMount() {
  const { locale, updateMessages } = this.props;
  loadLocaleData(locale)
    .then(updateMessages);
}

export async function componentWillReceiveProps(newProps) {
  const { locale, updateMessages } = this.props;
  const { newLocale } = newProps;

  // locale was changed
  if (newLocale && locale && newLocale !== locale) {
    const messages = await loadLocaleData(locale);
    updateMessages(messages);
  }
}

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  messages: makeSelectMessages(),
});

const mapDispatchToProps = {
  updateMessages: ACTION.updateMessages,
  //†actions
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount,
    componentWillReceiveProps,
  })
)(I18nComponent);
