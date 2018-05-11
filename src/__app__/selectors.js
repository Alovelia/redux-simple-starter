import { createSelector } from 'reselect';
// import _ from 'common/helpers';

export const selectRoute = state => state.get('route');
export const selectApp = state => state.get('app');

// TODO - add support for permissions and user profile
// const makeSelectCurrentUser = () => createSelector(
//   selectGlobal,
//   globalState => globalState.get('currentUser')
// );
//
// const makeSelectLoading = () => createSelector(
//   selectGlobal,
//   globalState => globalState.get('loading')
// );
//
// const makeSelectError = () => createSelector(
//   selectGlobal,
//   globalState => globalState.get('error')
// );
//
// const makeSelectRepos = () => createSelector(
//   selectGlobal,
//   globalState => globalState.getIn(['userData', 'repositories'])
// );

// const makeSelectLocationState = () => {
//   let prevRoutingState;
//   let prevRoutingStateJS;
//
//   return createSelector(
//     selectRoute,
//     (routingState) => {
//       if (!routingState.equals(prevRoutingState)) {
//         prevRoutingState = routingState;
//         prevRoutingStateJS = routingState.toJS();
//       }
//
//       return prevRoutingStateJS;
//     }
//   );
// };

export const makeActivePageSelector = () =>
  createSelector(selectApp, app => app && app.get('activePage'));

export const makeTitleSelector = () =>
  createSelector(makeActivePageSelector(), activePage => {
    if (activePage) {
      return activePage.get('title');
    }
  });
