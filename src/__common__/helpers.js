// https://github.com/megawac/babel-plugin-ramda
// https://github.com/lodash/babel-plugin-lodash
import * as R from 'ramda';
import _ from 'lodash/fp';
import { fromJS } from 'immutable';
import { CustomError } from 'common/error-core';

const isFunction = R.is(Function);
const toJS = (o) => {
  if (isFunction(o.toJS)) {
    return o.toJS();
  }
  throw new CustomError(`toJS is is not a function for ${o}`);
};

export default {
  identity: R.identity,
  is: R.is,
  isEmpty: R.isEmpty,
  isFunction,
  flatten: _.flatten,
  fromJS,
  toJS
};
