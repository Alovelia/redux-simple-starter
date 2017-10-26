import React from 'react';
import { render } from 'react-dom';
import { applyRouterMiddleware, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// Import error handlers
import { handleGlobalErrors } from 'common/ErrorHander';
// import FontFaceObserver from 'fontfaceobserver';
// import { useScroll } from 'react-router-scroll';
// import 'sanitize.css/sanitize.css';

// Import root app
import Root from './containers/Root';
import Home from './containers/App';

// Import routes
import createRoutes from './routes';

// Import CSS Global Styles
import './global.css';
// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from './selectors';

if (process.env.NODE_ENV === 'development') {
  //image placeholders mock
  // require('holderjs');
}

/* eslint-disable */
import configureStore from './store/configureStore';
// import routes from '../routes';


handleGlobalErrors();
// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: Home,
  childRoutes: createRoutes(store),
};


const renderApp = (App) => {
  render(
    <App
      store={store}
      history={history}
      rootRoute={rootRoute}
    />,
    document.getElementById('root')
  );
};

renderApp(Root);
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    /* eslint-disable */
    const NextRoot = require('./containers/Root').default;
    renderApp(NextRoot);
  });

  // TODO think up what should be updated
  // // modules.hot.accept does not accept dynamic dependencies,
  // // have to be constants at compile-time
  // module.hot.accept('./i18n', () => {
  //   render(translationMessages);
  // });
}

// Uncomment service worker to get caching and offline mode
// registerServiceWorker();
