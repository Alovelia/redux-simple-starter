import { createSelector } from 'reselect';

export const selectHome = state => state.get('home');

export const makeSelectUsername = () => createSelector(
  selectHome,
  homeState => homeState && homeState.get('username')
);
