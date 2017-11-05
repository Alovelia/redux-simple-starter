import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-router';
/* react-intl imports */
import I18nProvider from '../i18n/i18n-provider';

import Home from './home';
//DEV TOOLS
// import DevTools from './DevTools';

/*eslint-disable*/
const Root = ({ store, history, rootRoute }) => {
  return (
      <Provider store={store} >
        {/*<IntlProvider locale={'en'} messages={require('../i18n/en.json')}>*/}
        <I18nProvider>
          <Router
            history={history}
            routes={rootRoute}
          />
        </I18nProvider>
        {/*<Home />*/}
        {/*</IntlProvider>*/}
        {/*<I18nProvider messages={messages}>*/}
        {/*<Router*/}
        {/*history={history}*/}
        {/*routes={rootRoute}*/}
        {/*render={*/}
        {/*// Scroll to top when going to a new page, imitating default browser*/}
        {/*// behaviour*/}
        {/*applyRouterMiddleware(useScroll())*/}
        {/*}*/}
        {/*/>*/}
        {/*</I18nProvider>*/}
      </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};


export default Root;
