import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withState } from 'recompose';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import Child from './child';

export const HomeComponent = ({ trigger, setUpdate, username }) => (
  <div>
    <StyledButton
      onClick={() => {
        setUpdate(true);
        trigger('payload');
      }}
    >
      <FormattedMessage id="home.button-trigger" />
    </StyledButton>
    <FormattedMessage id="home.welcome" /> {username}
    <Child />
  </div>
);

const StyledButton = styled(Button)`
  && {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    border: 0;
    color: blue;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
    background: ${props => props.theme.palette.primary['A300']};
  }
`;

HomeComponent.propTypes = {
  trigger: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  username: PropTypes.string,
};

HomeComponent.defaultProps = {
  username: '',
};

export default compose(withState('update', 'setUpdate', false))(HomeComponent);
