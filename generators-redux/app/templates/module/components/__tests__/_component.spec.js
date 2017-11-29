import { shallow } from 'enzyme';
import React from 'react';
import noop from 'lodash/noop';
import <%=_.camelCaseUpperFirst(name)%> from '../<%=name%>';
// import { ACTION } from '../../reducer';

describe('<<%=_.camelCaseUpperFirst(name)%> />', () => {
  let wrapper;
  let stub;
  beforeAll(() => {
    // stub = sinon.stub(ACTION, 'get').returns({ type: 'mock' });
  });
  afterAll(() => {
    // stub.restore();
  });
  it('when initializing, the expected output is rendered', () => {
    const props = {
      // trigger: noop
    };
    wrapper = shallow(<<%=_.camelCaseUpperFirst(name)%> {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  // it('should trigger action', () => {
  //   const props = {
  //     trigger: stub
  //   };
  //   shallow(<<%=_.camelCaseUpperFirst(name)%> {...props} />)
  //     // .dive() // for HOC
  //     .find('button')
  //     .simulate('click');
  //   expect(stub).to.have.been.called();
  //   expect(stub).to.have.been.calledWith('payload');
  // });
});
