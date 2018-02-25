import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IntlProvider } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import _ from 'common/helpers';
import { makeSelectLocale, makeSelectMessages } from '../selectors';
import { loadLocaleData } from '../core';
import { ACTION } from '../reducer';

export class I18nContainer extends Component {
  async componentDidMount() {
    const { locale, updateMessages } = this.props;
    console.error('1111');
    const messages = await loadLocaleData(locale);
    updateMessages(messages);
  }

  async componentWillReceiveProps(newProps) {
    const { locale, updateMessages } = this.props;
    const { locale: newLocale } = newProps;

    // locale was changed - switch language
    if (newLocale && locale && newLocale !== locale) {
      const messages = await loadLocaleData(newLocale);
      updateMessages(messages);
    }
  }

  render() {
    const { messages, locale, children } = this.props;
    /* eslint-disable react/jsx-closing-tag-location */
    return !_.isEmpty(messages)
      ? <IntlProvider
        messages={messages}
        locale={locale}
        key={locale}
      >
        {children}
      </IntlProvider>
      : null;
  }
}

I18nContainer.propTypes = {
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  messages: makeSelectMessages(),
});

const mapDispatchToProps = {
  updateMessages: ACTION.updateMessages,
  //†actions
};

export default compose(connect(
  mapStateToProps,
  mapDispatchToProps
))(I18nContainer);
