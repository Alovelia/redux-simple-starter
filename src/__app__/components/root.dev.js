import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import I18nProvider from 'src/__i18n__/containers/i18n';
import Home from 'src/home/loadable';
// Import root app
import Layout from './layout';

const Root = ({ store, history }) => {
  return (
    <AppContainer warnings={false}>
      <Provider store={store} >
        <I18nProvider>
          <ConnectedRouter history={history}>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/features" component={() => <div>Features</div>} />
                <Route path="" component={() => <div>Not found</div>} />
              </Switch>
            </Layout>
          </ConnectedRouter>
        </I18nProvider>
      </Provider>
    </AppContainer>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
