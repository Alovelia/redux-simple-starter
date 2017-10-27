import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
/* react-intl imports */
import { FormattedMessage } from 'react-intl';
import Child from './Child';
import { ApiError } from '../../__common__/ErrorHander';

// console.info(global);
/* eslint-disable */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Promise.reject(new ApiError());
  }
  render() {
    return (<div>
      <button onClick={() => {
        this.setState({ updated: true });
        this.props.trigger();
      }}
      >1Click ME 1!</button>
      end
      <FormattedMessage id="app.welcome" />
      <Child />
    </div>);
  }
}

export default compose(
  connect(() => ({}), {
    trigger: () => ({ type: 'EVENT' })
  })
)(App);

