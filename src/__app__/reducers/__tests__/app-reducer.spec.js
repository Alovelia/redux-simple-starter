import { is, fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import reducer, { ACTION, TYPE, initialState } from '../app-reducer';

describe('app reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).to.equal(initialState);
  });

  it(`should handle ${LOCATION_CHANGE}`, () => {
    expect(
      reducer(initialState, {
        type: LOCATION_CHANGE,
        payload: {
          pathname: '/home'
        }
      }).get('activePage')
    ).to.equal(fromJS({ 'path': '/', 'name': 'home', 'title': 'home.title' }));
  });
});
