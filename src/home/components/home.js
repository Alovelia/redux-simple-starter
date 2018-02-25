import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withState } from 'recompose';
import Child from './child';

export const HomeComponent = ({
  trigger,
  setUpdate,
  username,
}) => (
  <div>
    <button onClick={() => {
    setUpdate(true);
    trigger('payload');
  }}
    >
      <FormattedMessage id="home.button-trigger" />
    </button>
    <FormattedMessage id="home.welcome" /> {username}
    <Child />
  </div>
);

HomeComponent.propTypes = {
  trigger: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  username: PropTypes.string,
};

HomeComponent.defaultProps = {
  username: '',
};

export default compose(withState('update', 'setUpdate', false))(HomeComponent);
