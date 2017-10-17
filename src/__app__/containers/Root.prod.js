import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    return (<Provider store={this.props.store}>
      {/*<App />*/}
      <div>
        {/*<Router*/}
        {/*history={history}*/}
        {/*routes={routes}*/}
        {/*/>*/}
      </div>
    </Provider>);
  }
}
