import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ApiError } from 'common/error-core';
import Home from '../components/home';
import { ACTION } from '../reducer';
import { makeSelectUsername } from '../selectors';

export class HomeContainer extends Component {
  componentDidMount() {
    Promise.reject(new ApiError());
  }
  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername()
});
const mapDispatchToProps = {
  trigger: ACTION.get,
  //†action
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(HomeContainer);

