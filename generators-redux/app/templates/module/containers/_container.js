// GLOBAL IMPORTS
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// LOCAL IMPORTS
import <%=_.camelCaseUpperFirst(name)%> from '../components/<%=name%>';
// import { ACTION } from '../reducer';
// import { } from '../selectors';

export class <%=_.camelCaseUpperFirst(name)%>Container extends Component {
  render() {
    return React.createElement(<%=_.camelCaseUpperFirst(name)%>, this.props);
  }
}

const mapStateToProps = createStructuredSelector({
  //†selector
});
const mapDispatchToProps = {
  //†action
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(<%=_.camelCaseUpperFirst(name)%>Container);

