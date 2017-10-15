// import './common/polyfills';
// import './index.scss'
// import registerServiceWorker from './registerServiceWorker';
import renderApp from './containers/Root';

if (process.env.NODE_ENV === 'development') {
  //image placeholders mock
  // require('holderjs');
}

renderApp();
// Uncomment service worker to get caching and offline mode
// registerServiceWorker();
