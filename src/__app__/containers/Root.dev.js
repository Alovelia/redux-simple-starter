import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
/* react-intl imports */
import { IntlProvider } from 'react-intl';
import { AppContainer } from 'react-hot-loader';
import Home from './App';

//DEV TOOLS
// import DevTools from './DevTools';

/*eslint-disable*/
const Root = ({ store, history, rootRoute }) => {
  return (
    <AppContainer>
      <Provider store={store} >
        <IntlProvider locale={'en'} messages={require('../i18n/en.json')}>
          <Router
            history={history}
            routes={rootRoute}
          />
          <Home />
        </IntlProvider>
        {/*<LanguageProvider messages={messages}>*/}
          {/*<Router*/}
            {/*history={history}*/}
            {/*routes={rootRoute}*/}
            {/*render={*/}
              {/*// Scroll to top when going to a new page, imitating default browser*/}
              {/*// behaviour*/}
              {/*applyRouterMiddleware(useScroll())*/}
            {/*}*/}
          {/*/>*/}
        {/*</LanguageProvider>*/}
      </Provider>
    </AppContainer>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;