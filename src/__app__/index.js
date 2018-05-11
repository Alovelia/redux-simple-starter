// Support for async functions and generators
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';

// Import error handlers
import { handleGlobalErrors } from 'common/error-core';

// Font Observer
// import 'common/font-observer'; // before uncomment - $ yarn add fontfaceobserver

// #if process.env.NODE_ENV === 'development'
import 'common/holderjs';
// #endif

// Import CSS Global Styles
import 'sanitize.css/sanitize.css';
import './app.css';

// Import root app
import Root from './components/root';

import configureStore from './store';

// Import styles
import { Styles } from '../client/styles';

// Listen to uncaught errors and unhandled promises
handleGlobalErrors();

const initialState = {
  // set intl defaults
};
const history = createHistory();
// Create redux store with history
const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('root');

const renderApp = App => {
  ReactDOM.render(
    <Styles>
      <App store={store} history={history} />
    </Styles>,
    MOUNT_NODE,
  );
};

renderApp(Root);

// #if process.env.NODE_ENV === 'development'
// <-----------------HMR---------------------
const rerenderApp = () => {
  // eslint-disable-next-line global-require
  const NextRoot = require('./components/root');
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  renderApp(NextRoot);
};

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/root', rerenderApp);
  // don't reload if some locale dependent files changed
  module.hot.accept('../__i18n__/core', rerenderApp);
  // selectors shouldn't reload browser
  module.hot.accept('../__i18n__/selectors', rerenderApp);
  //†selector
}
// -----------------HMR-------------------- />
// #endif

// Uncomment service worker to get caching and offline mode
// const registerServiceWorker = require('./register-service-worker');
// if (process.env.NODE_ENV === 'production') {
//   registerServiceWorker();
// }
