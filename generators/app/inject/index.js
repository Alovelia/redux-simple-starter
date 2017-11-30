let path = require('path'),
  injector = require('./core'),
  chalk = require('chalk'),
  config = require('../config'),
  _ = require('../utils/mixins');

async function injectionStrategy(props) {
  const inject = injector(props);

  switch (props.injectionType) {
    case 'action': {
      await inject({
        rules: 'action',
        fileName: 'action-types',
        wrapperOuter: 'src',
      // ext: '.js',
      // moduleName: '',
      // wrapperInner: `store/${props.moduleName}`
      });
      break;
    }

    default: {
      console.info(chalk.red('No match in injection rules'));
    }

  }
}

function error(e, props) {
  console.log(chalk.red('------Injection error------'));
  console.log(chalk.red(` ${props.injectionType} ${props.name}`));
  console.log(chalk.red(`  ${e}`));
  console.log(chalk.red('---------------------------'));
}

function success() {
  // console.log(chalk.green('--------Injection completed--------'));
}

module.exports = injectionStrategy;
