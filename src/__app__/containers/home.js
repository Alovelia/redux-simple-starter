import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
/* react-intl imports */
import { FormattedMessage } from 'react-intl';
import { ApiError } from 'common/error-hander';
import Child from './child';

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
      >1Click ME!</button>asdasdasd
      endaasdad  assssssssss aazzzzzzzz zz

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

