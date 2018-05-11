import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import React from 'react';
import noop from 'lodash/noop';
import { Styles } from '../../../client/styles';
import messages from '../../../__i18n__/en.json';
import Home from '../home';
import { ACTION } from '../../reducer';

describe('<Home />', () => {
  let wrapper;
  let stub;
  beforeAll(() => {
    stub = sinon.stub(ACTION, 'get').returns({ type: 'mock' });
  });
  afterAll(() => {
    stub.restore();
  });
  it('when initializing, the expected output is rendered', () => {
    const props = {
      trigger: noop,
    };
    wrapper = shallow(<Home {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should trigger action', () => {
    const props = {
      trigger: stub,
    };

    // console.error(
    //   shallow(
    //     <Styles>
    //       <IntlProvider locale="en" messages={messages}>
    //         <Home {...props} />
    //       </IntlProvider>
    //     </Styles>,
    //   )
    //     .dive()
    //     .html(),
    // );

    mount(
      <Styles>
        <IntlProvider locale="en" messages={messages}>
          <Home {...props} />
        </IntlProvider>
      </Styles>,
    )
      .find('button')
      .simulate('click');
    expect(stub).to.have.been.called();
    expect(stub).to.have.been.calledWith('payload');
  });
});
