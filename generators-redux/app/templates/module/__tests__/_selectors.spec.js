import { fromJS } from 'immutable';

import {
  select<%=_.camelCaseUpperFirst(name)%>,
  // makeSelect_,
  //†selector
} from '../selectors';

describe('select<%=_.camelCaseUpperFirst(name)%>', () => {
  it('should select the <%=_.camelCaseUpperFirst(name)%> state', () => {
    const <%=_.camelCase(name)%>State = fromJS({
      prop: 'prop',
    });
    const mockedState = fromJS({
    <%=_.camelCase(name)%>: <%=_.camelCase(name)%>State,
    });
    expect(select<%=_.camelCaseUpperFirst(name)%>(mockedState)).toEqual(<%=_.camelCase(name)%>State);
  });
});

//†test

// describe('makeSelect_', () => {
//   const selector = makeSelect_();
//   it('should select ...', () => {
//     const prop = 'prop';
//     const mockedState = fromJS({
//       <%=_.camelCaseUpperFirst(name)%>: {
//         prop,
//       },
//     });
//     expect(selector(mockedState)).toEqual(prop);
//   });
// });
