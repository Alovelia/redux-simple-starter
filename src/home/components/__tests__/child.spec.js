import { shallow } from 'enzyme';
import React from 'react';
import Child from '../child';

describe('<Child />', () => {
  const props = {};
  it('when initializing, the expected output is rendered', () => {
    expect(shallow(<Child {...props} />)).toMatchSnapshot();
  });
});
