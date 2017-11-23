import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';
import { createMockStore } from 'redux-test-utils';
import { fromJS } from 'immutable';
import noop from 'lodash/noop';
import HomeConnected, { HomeContainer } from '../home';

describe('<HomeConnected />', () => {
  let wrapper;
  let store;
  beforeAll(() => {
    const initialState = fromJS({});
    store = createMockStore(initialState);
    wrapper = shallow(<HomeConnected store={store} />);
  });

  it('has proper component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
