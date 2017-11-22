import { shallow } from 'enzyme';
import React from 'react';
import Layout from '../layout';

describe('<Layout />', () => {
  test('when initializing, the expected output is rendered', () => {
    expect(shallow(<Layout />)).toMatchSnapshot();
  });
});
