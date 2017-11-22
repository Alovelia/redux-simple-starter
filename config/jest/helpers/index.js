require('./chai-polyfill');
require('./intl-context');
// throw errors to fail the build
// console.error = msg => { throw new Error(msg); }; // eslint-disable-line no-console

global.Promise = require('bluebird');

Promise.config({
  warnings: false // turn off warnings during test, since it throws when faking server
});

// jest context polyfill https://github.com/facebook/jest/issues/2468#issuecomment-269718083
global.context = describe;
global.it = test;