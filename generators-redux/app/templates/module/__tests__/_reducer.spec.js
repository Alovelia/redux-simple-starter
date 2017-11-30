import { is, fromJS } from 'immutable';
import reducer, { ACTION, TYPE, initialState } from '../reducer';

describe('<%=name%> reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).to.equal(initialState);
  });

  // it(`should handle ${TYPE.GET_SUCCESS}`, () => {
  //   expect(
  //     reducer(initialState, {
  //       type: TYPE.GET_SUCCESS,
  //       payload: undefined
  //     }).get('username')
  //   ).to.equal('username');
  // });
});
