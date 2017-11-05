/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';

export function Title(props) {
  return (
    <Helmet>
      <title>
        {props.intl.formatMessage({ id: props.id })}
      </title>
    </Helmet>
  );
}

Title.propTypes = {
  intl: PropTypes.object.isRequired,
  id: PropTypes.string,
};
Title.defaultProps = {
  id: '_',
};

export default injectIntl(Title);
