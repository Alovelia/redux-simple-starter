import { shallow } from 'enzyme';
import React from 'react';
import noop from 'lodash/noop';
import Home from '../home';

describe('<Home />', () => {
  const props = {
    trigger: noop
  };
  it('when initializing, the expected output is rendered', () => {
    expect(shallow(<Home {...props} />)).toMatchSnapshot();
  });
});
