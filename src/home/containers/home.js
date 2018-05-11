import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'common/injectors/inject-reducer';
import injectSaga from 'common/injectors/inject-saga';
import { ApiError } from 'common/error-core';
import Home from '../components/home';
import reducer, { ACTION } from '../reducer';
import { makeSelectUsername } from '../selectors';
import saga from '../sagas';

export class HomeContainer extends Component {
  componentDidMount() {
    Promise.reject(new ApiError());
  }

  render() {
    return <Home {...this.props} />;
  }
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
});
const mapDispatchToProps = {
  trigger: ACTION.get,
  //†action
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
// #if process.env.NODE_ENV !== 'development'
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });
// #endif

/* eslint-disable */
export default compose(
  // #if process.env.NODE_ENV !== 'development'
  withReducer,
  withSaga,
  // #endif
  withConnect
)(HomeContainer);
