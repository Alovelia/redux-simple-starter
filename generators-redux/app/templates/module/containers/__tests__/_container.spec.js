import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';
import { createMockStore } from 'redux-test-utils';
import { fromJS } from 'immutable';
import noop from 'lodash/noop';
import <%=_.camelCaseUpperFirst(name)%>Connected, { <%=_.camelCaseUpperFirst(name)%>Container } from '../<%=name%>';

describe('<<%=_.camelCaseUpperFirst(name)%>Connected />', () => {
  let wrapper;
  let store;
  beforeAll(() => {
    const initialState = fromJS({});
    store = createMockStore(initialState);
    wrapper = shallow(<<%=_.camelCaseUpperFirst(name)%>Connected store={store} />);
  });

  it('has proper component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
