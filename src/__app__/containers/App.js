import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Child from './Child';
import { ApiError } from '../../__common__/ErrorHander';


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
        // this.props.trigger();
      }}
      >1Click ME PLEASE21!</button>
      end122413222
      <Child />
    </div>);
  }
}

export default compose(
  connect(() => ({}), {
    trigger: () => ({ type: 'EVENT1343' })
  })
)(App);
