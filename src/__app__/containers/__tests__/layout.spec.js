import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { fromJS } from 'immutable';
import LayoutConnected, { mapStateToProps } from '../layout';

describe('<LayoutConnected />', () => {
  let wrapper;
  const APP_TITLE = 'home.title';
  let store;
  beforeAll(() => {
    const initialState = fromJS({
      app: {
        activePage: {
          title: APP_TITLE,
        },
      },
    });
    store = createMockStore(initialState);
    wrapper = shallow(<LayoutConnected store={store} />);
  });

  it('has proper component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should connect component to store properties', () => {
    const initialState = fromJS({
      app: {
        activePage: {
          title: APP_TITLE,
        },
      },
    });

    expect(mapStateToProps(initialState)).to.deep.equal({
      title: APP_TITLE,
    });
  });
});
