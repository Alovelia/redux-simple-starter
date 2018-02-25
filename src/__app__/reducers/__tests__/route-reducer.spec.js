import { is, fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import reducer, { ACTION, TYPE, initialState } from '../route-reducer';

describe('route reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).to.equal(initialState);
  });

  it(`should handle ${LOCATION_CHANGE}`, () => {
    const payload = Symbol('payload');
    expect(reducer(initialState, {
      type: LOCATION_CHANGE,
      payload
    }).get('location')).to.equal(payload);
  });
});
