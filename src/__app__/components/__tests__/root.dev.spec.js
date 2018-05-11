import { shallow } from 'enzyme';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import Root from '../root.dev';

describe('<Root />', () => {
  const props = {
    history: {},
    rootRoute: [],
    store: createMockStore(),
  };
  it('when initializing, the expected output is rendered', () => {
    expect(shallow(<Root {...props} />)).toMatchSnapshot();
  });
});
