/*
 * This is a main file which decides what to do with particular subgenerator
 * It will be invoked if subgenerators option was chosen
 * */

let compileTpl = require('./core'),
  path = require('path'),
  _ = require('../utils/mixins'),
  config = require('../../app/config'),
  { compiler, multiOption } = require('./core');
  // injectionStrategy = require('../injection');

async function compileStrategy(props) {
  const compile = compiler(props);

  switch (props.compilationType) {
    case 'reducer': {
      await compile({
        tmplName: '_reducer.js',
        //name: props.name,
        ext: '.js',
        wrapperOuter: 'src',
        // wrapperInner: multiOption(props.name),
        // fileName: 'index',
        // multiKeys  : ['wrapperInner'],
        // moduleName: 'mod2',
      });

      break;
    }

    default:
      console.log('no match in generators');
      console.log('the action was skipped');
  }
}

module.exports = compileStrategy;
