import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { ApiError } from 'common/error-core';
import Child from './child';
import { ACTION } from '../reducer';

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
      >Trigger async action</button>
      <FormattedMessage id="app.welcome" />
      <Child />
    </div>);
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  trigger: ACTION.get,
  //†action
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(App);

