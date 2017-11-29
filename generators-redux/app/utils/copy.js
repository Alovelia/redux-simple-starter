const fse = require('fs-extra');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const curry = require('lodash/fp/curry');
const config = require('../config');
const _ = require('./mixins');
const warnings = require('./warnings');

// const lstatP = Promise.promisify(fs.lstat);
const chmod = Promise.promisify(fs.chmod);
let readFile = Promise.promisify(fs.readFile);

exports.copy = curry(async (src, dest) => {
  const srcResolved = path.resolve(config.TEMPLATE_ROOT, src || '');
  const destResolved = path.resolve(process.cwd(), dest || '');

  try {
    if (await fse.pathExists(destResolved)) {
      return warnings.showExistWarning(destResolved);
    }
    await fse.copy(srcResolved, destResolved, { errorOnExist: true });
    await chmod(destResolved, '755');
  } catch (err) {
    console.error(err);
  }
});

exports.copyTpl = curry(async (src, dest, data = {}) => {
  const srcResolved = path.resolve(config.TEMPLATE_ROOT, src || '');
  const destResolved = path.resolve(process.cwd(), dest || '');

  try {
    if (await fse.pathExists(destResolved)) {
      return warnings.showExistWarning(destResolved);
    }

    const tmplFile = await readFile(srcResolved);
    const compiled = _.template(tmplFile.toString())(Object.assign({}, _, data));
    await fse.outputFile(destResolved, compiled);
    await chmod(destResolved, '755');
  } catch (err) {
    console.error(err);
  }
});
