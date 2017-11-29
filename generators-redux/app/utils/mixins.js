let _ = require('lodash');

// TODO add tests for these functions

module.exports = _.mixin({
  camelCaseUpperFirst,
  toConstantFormat,
  toConstantFormatRaw,
  dasherize
});

function camelCaseUpperFirst(value) {
  return _.flowRight(
    _.upperFirst,
    _.camelCase
  )(value);
}

function toConstantFormat(value) {
  return _.flowRight(
    _.toUpper,
    _.partialRight(_.replace, /-/g, '_'),
    _.kebabCase
  )(value);
}
// to use with ducks helpers ~ASYNC_ACTION
function toConstantFormatRaw(value) {
  const prefix = ~value.indexOf('~') ? '~' : '';
  return `${prefix}${toConstantFormat(value)}`;
}

// As far as I remember this function will make kabeb-case not lowUPPER -> low-u-p-p-e-r but low-upper
function dasherize(str) {
  let match = /[A-Z]+/.test(str),
    arr = str.split(''),
    copy = [],
    res = null,
    isUpperCase = function (letter) {
      return letter === letter.toUpperCase();
    };

  for (let i = 0, length = arr.length; i < length; i++) {
    copy[i] = arr[i];
  }

  for (let i = 0, length = arr.length; i < length; i++) {
    if (arr[i + 1] && isUpperCase(arr[i])) {
      res = isUpperCase(arr[i + 1]);
      if (res && arr[i - 1] && !isUpperCase(arr[i - 1])) {
        continue;
      }
      if (res || res === false && i === 0) {
        copy[i] = arr[i].toLowerCase();
      }
    } else if (!arr[i + 1]) {
      copy[i] = arr[i].toLowerCase();
    }
  }
  return copy.join('')
    .replace(/([A-Z]+)/g, '-$1')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase();
}
