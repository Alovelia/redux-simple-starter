// Support for async functions and generators
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Import error handlers
import { handleGlobalErrors } from 'common/error-core';

// Font Observer
// import 'common/font-observer'; // before uncomment - $ yarn add fontfaceobserver

// #if process.env.NODE_ENV === 'development'
import 'common/holderjs';
// #endif

// Import CSS Global Styles
import 'sanitize.css/sanitize.css';
import './global.css';

// Import root app
import Root from './containers/root';
import Layout from './containers/layout';

// Import routes
import createRoutes from './routes';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from './selectors';
import configureStore from './store';

// Listen to uncaught errors and unhandled promises
handleGlobalErrors();

const initialState = {
  // set intl defaults
};
// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const store = configureStore(initialState, browserHistory);
// const store = configureStore(initialState);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = createRoutes(store);

const renderApp = (App) => {
  render(
    <App
      store={store}
      history={history}
      rootRoute={rootRoute}
      layout={Layout}
    />,
    document.getElementById('root')
  );
};

renderApp(Root);

// #if process.env.NODE_ENV === 'development'
const rerenderApp = () => {
  // eslint-disable-next-line global-require
  const NextRoot = require('./containers/root');
  renderApp(NextRoot);
};

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/root', rerenderApp);
  // don't reload page if some route dependent files changed
  module.hot.accept('./routes', rerenderApp);
  // don't reload if some locale dependent files changed
  module.hot.accept('../__i18n__/i18n-core', rerenderApp);
  // selectors shouldn't reload browser
  module.hot.accept('../__i18n__/i18n-selectors', rerenderApp);
}
// #endif

// Uncomment service worker to get caching and offline mode
// const registerServiceWorker = require('./register-service-worker');
// if (process.env.NODE_ENV === 'production') {
//   registerServiceWorker();
// }
