let path = require('path');
let chalk = require('chalk');
let fse = require('fs-extra');
let fs = require('fs');
let Promise = require('bluebird');
let config = require('../config');
let _ = require('../utils/mixins');
let rules = require('./rules');

let log = console.log.bind(console);
let readFile = Promise.promisify(fs.readFile);
let writeFile = Promise.promisify(fs.writeFile);

async function injectCode(props) {
  let target = path.resolve(
    config.APP_ROOT,
    props.wrapperOuter || '',
    props.moduleName || '',
    props.wrapperInner || '',
    (props.fileName || '') + (props.ext || '.js')
  );

  console.log(chalk.yellow('Injecting to: ') + chalk.gray(target));

  try {
    if (!await fse.pathExists(target)) {
      throw new Error(`${target} doesn't exist. Create it before injecting`);
    }
    const data = await readFile(target);
    const newData = await makeInjection(data, props);
    await writeFile(target, newData);
  } catch (e) {
    console.info(chalk.red(e.message));
  }
  return target;
}

function makeInjection(content, props) {
  let settings = Object.assign({}, _, props);
  /* Any modification goes here. Note that contents is a Buffer object */
  let newContent = content.toString();
  let isMultiple = !!~props.name.indexOf(' ');
  let injections = [props.name];

  if (isMultiple) {
    injections = props.name.split(' ');
    // if some keys are also arrays and should be used during injection in the same order as name: '1 2 3', key2:
    // 'v1 v2 v3'
    if (settings.multiKeys) {
      settings.multiKeys.forEach((key) => {
        settings[key] = settings[key].split(' ');
      });
    }
  }
  injections.forEach((injection, index) => {
    props.rules.forEach((rule) => {
      let match = rule.cursor;
      let multipleObj = Object.assign({}, settings);
      if (isMultiple && settings.multiKeys) {
        settings.multiKeys.forEach((key) => {
          multipleObj[key] = settings[key][index];
        });
      }
      let replacement = _.template(rule.replacement)(
        Object.assign(multipleObj, { name: injection })
      );
      let regEx = new RegExp(`(\\s*|\\t*)(${match})`, 'g');
      newContent = newContent.replace(regEx, `$1${replacement}$1$2`);
    });
  });
  return newContent;
}

async function injector(props, options) {
  let settings = Object.assign({}, _, props, options, { rules: rules[options.rules] });
  return injectCode(settings);
}

exports.injector = _.curry(injector);
