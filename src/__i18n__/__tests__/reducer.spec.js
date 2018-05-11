// import { is, fromJS } from 'immutable';
import { fromJS } from 'immutable';
// import reducer, { ACTION, TYPE, initialState } from '../reducer';
import reducer, { TYPE, initialState } from '../reducer';

describe('i18n reducer', () => {
  it('should return the initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).to.equal(initialState);
  });

  it(`should handle ${TYPE.UPDATE_LOCALE}`, () => {
    const payload = Symbol('en');
    expect(
      reducer(initialState, {
        type: TYPE.UPDATE_LOCALE,
        payload,
      }).get('locale'),
    ).to.equal(payload);
  });

  it(`should handle ${TYPE.UPDATE_MESSAGES}`, () => {
    const payload = { id: 'id' };
    expect(
      reducer(initialState, {
        type: TYPE.UPDATE_MESSAGES,
        payload,
      }).get('messages'),
    ).to.equal(fromJS(payload));
  });
});
