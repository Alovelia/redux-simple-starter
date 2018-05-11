// import { fromJS, is } from 'immutable';
import { fromJS } from 'immutable';
import _ from '../helpers';

describe('helpers', () => {
  describe('fromJS and toJS', () => {
    let obj;
    let left;
    let right;
    beforeAll(() => {
      obj = { a: 1 };
      left = _.fromJS(obj);
      right = fromJS(obj);
    });

    it('should work exactly as fromJS', () => {
      expect(left).to.equal(right);
    });
    it('should work exactly as toJS', () => {
      expect(_.toJS(left)).to.deep.equal(left.toJS());
      expect(_.toJS(right)).to.deep.equal(right.toJS());
    });
  });
});
