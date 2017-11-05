/**
 * The global state selectors
 */
// import { createSelector } from 'reselect';

// const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

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

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectRoute,
  // selectGlobal,
  // makeSelectCurrentUser,
  // makeSelectLoading,
  // makeSelectError,
  // makeSelectRepos,
  makeSelectLocationState,
};
