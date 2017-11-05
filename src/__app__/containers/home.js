import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { ApiError } from 'common/error-core';
import Title from 'common/title/title';
import Child from './child';

// console.info(global);
/* eslint-disable */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Promise.reject(new ApiError());
  }
  componentWillReceiveProps(){
    console.info('propszz');
    console.log('props');
  }
  render() {
    return (<div>
      <button onClick={() => {
        this.setState({ updated: true });
        this.props.trigger();
      }}
      >1Click ME!</button>asdasdasd
      endaasdad  assssssssss aazzzzzzzz zz zzz zxc
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

