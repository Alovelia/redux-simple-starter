// import './common/polyfills';
// import './index.scss'
// import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { handleGlobalErrors } from '../__common__/ErrorHander';

if (process.env.NODE_ENV === 'development') {
  //image placeholders mock
  // require('holderjs');
}

/* eslint-disable */
import configureStore from './store/configureStore';
// import routes from '../routes';

handleGlobalErrors();
const store = configureStore();

const renderApp = (App) => {
  render(
    <App store={store} />,
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
}

// Uncomment service worker to get caching and offline mode
// registerServiceWorker();
