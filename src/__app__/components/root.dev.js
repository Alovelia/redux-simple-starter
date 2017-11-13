import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';
import { AppContainer } from 'react-hot-loader';
import I18nProvider from '../../__i18n__/containers/i18n';

// --------------------- ATTENTION -----------------------------------------
// It's a hack for full HMR support
// Current architecture is based on lazy load
// Page reload for route dependent components was frozen
// To keep HMR working with frozen page reload for route dependent component
// such components should be listed here in root component.
// --------------------- /ATTENTION ----------------------------------------
import '../../home/containers/home';
// †module

const Root = ({ store, history, rootRoute }) => {
  return (
    <AppContainer>
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
    </AppContainer>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  rootRoute: PropTypes.array.isRequired
};

export default Root;