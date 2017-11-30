import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

class <%=_.camelCaseUpperFirst(name)%>Component extends Component {
  render() {
    return (<div>
      <FormattedMessage id="<%=name%>.title" />
    </div>);
  }
}

<%=_.camelCaseUpperFirst(name)%>Component.propTypes = {};

<%=_.camelCaseUpperFirst(name)%>Component.defaultProps = {};

export default <%=_.camelCaseUpperFirst(name)%>Component;
