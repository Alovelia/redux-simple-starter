import React from 'react';
// import { shallowWithIntl } from 'enzyme-react-intl';
// import HomeConnected, { HomeContainer } from '../home';
import { HomeContainer } from '../home';

describe('<HomeContainer />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<HomeContainer />);
  });

  it('has proper component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
