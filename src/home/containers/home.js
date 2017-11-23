import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ApiError } from 'common/error-core';
import { lifecycle } from 'recompose';
import Home from '../components/home';
import { ACTION } from '../reducer';
import { makeSelectUsername } from '../selectors';

export class HomeContainer extends Component {
  componentWillUpdate() {
    console.info('HMR bugz');
  }
  render() {
    return <Home {...this.props} />;
  }
}

export const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername()
});
export const mapDispatchToProps = {
  trigger: ACTION.get,
  //†action
};

export default compose(
  // lifecycle({
  //   componentDidMount() {
  //     console.info('HMR bugz');
  //   }
  // }),
  connect(mapStateToProps, mapDispatchToProps),
)(HomeContainer);

