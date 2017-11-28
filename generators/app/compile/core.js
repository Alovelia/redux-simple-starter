let chalk = require('chalk'),
  { copyTpl } = require('../utils/copy'),
  _ = require('../utils/mixins'),
  config = require('../config'),
  path = require('path');

//It compiles file from corresponding template to corresponding destination
async function compileTemplate(props) {
  let destination = path.resolve(
      config.APP_ROOT,
      props.wrapperOuter || '',
      props.moduleName || '',
      props.wrapperInner || ''
    ),
    fileName = path.resolve(destination, (props.fileName || props.name) + (props.ext || '.js')),
    templateName = path.resolve(config.TEMPLATE_ROOT, props.tmplName);

  await copyTpl(templateName, fileName, props);
  return fileName;
}

async function compiler(props, options) {
  let settings = Object.assign({}, props, options);

  if (!~settings.name.indexOf(' ')) {
    // create single instance
    return compileTemplate(settings);
  }
  // create multiple instances
  return settings.name.split(' ')
    .map(async (name, index) => {
      let multiObj = {};
      // It relies on `multiOption` method for keys which were defined in `multiKeys` option
      if (options.multiKeys) {
        // each element inside this `multiple` array should be set via `multiOption` method
        options.multiKeys.forEach((key) => {
          multiObj[key] = options[key][index];
        });
      }
      // this way source option with multiple values will be replaced with single value for current index
      let settingsSingle = Object.assign({}, props, options, { name }, multiObj);
      return compileTemplate(settingsSingle);
    });
}

// for compilers which could support multiple strategies of creation using 'space' as a separator
// For example user inputs 'component1 component2' as a props.name in terminal
//   folderName: multiOption(props.name, 'components/'), // if no space then it will be just folderName: 'components/component1'
//   folderName: multiOption(props.name, 'components/'), // if space it will be folderName: ['components/component1', 'components/component2']
//   fileName: multiOption(props.name, null, '.mod'),
//   multiple: ['folderName', 'fileName']
// It will create
//   folderName: `${props[]}`
function multiOption(value, prefix, sufix) {
  return ~value.indexOf(' ')
    ? value
      .split(' ')
      .map(single => (`${prefix || ''}${single}${sufix || ''}`))
    : `${prefix || ''}${value}${sufix || ''}`;
}

exports.compiler = _.curry(compiler);
exports.multiOption = multiOption;
