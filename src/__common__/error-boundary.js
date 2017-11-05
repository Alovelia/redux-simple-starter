import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
* @description
* https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
* Alternetively
* https://github.com/kossnocorp/react-guard
* */
export default class ErrorBoundary extends Component {
  static propTypes = {
    // children: PropTypes.any,
    children: PropTypes.node
  };
  static defaultProps = {
    children: null // []
  };
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
