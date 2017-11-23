import { fromJS } from 'immutable';

import {
  selectRoute,
  selectApp,
  makeSelectLocationState,
  makeActivePageSelector,
  makeTitleSelector,
} from '../selectors';

describe('selectRoute', () => {
  it('should select the route state', () => {
    const routeState = fromJS({
      location: 'home',
    });
    const mockedState = fromJS({
      route: routeState,
    });
    expect(selectRoute(mockedState)).toEqual(routeState);
  });
});
// TODO
// describe('makeSelectUsername', () => {
//   const usernameSelector = makeSelectUsername();
//   it('should select the username', () => {
//     const username = 'username';
//     const mockedState = fromJS({
//       home: {
//         username,
//       },
//     });
//     expect(usernameSelector(mockedState)).toEqual(username);
//   });
// });
