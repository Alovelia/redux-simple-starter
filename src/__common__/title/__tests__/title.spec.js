import React from 'react';
import { mount } from 'enzyme';
import { mountWithIntl } from 'enzyme-react-intl';
import Helmet from 'react-helmet';
import Title from '../title';

describe('<Title />', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mountWithIntl(<Title id="home.title" />);
  });

  it('should update browser title', () => {
    const helmet = Helmet.peek();
    expect(helmet.title).to.be.equal('Title Welcome');
  });
});
