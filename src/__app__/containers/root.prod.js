import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';
import I18nProvider from '../i18n/i18n-provider';

const Root = ({ store, history, rootRoute }) => {
  return (
    <Provider store={store} >
      <I18nProvider>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </I18nProvider>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  rootRoute: PropTypes.object.isRequired
};

export default Root;
