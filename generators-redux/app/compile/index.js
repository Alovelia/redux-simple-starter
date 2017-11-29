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
    // case 'reducer': {
    //   await compile({
    //     tmplName: '_reducer.js',
    //     //name: props.name,
    //     ext: '.js',
    //     wrapperOuter: 'src',
    //     // wrapperInner: multiOption(props.name),
    //     // fileName: 'index',
    //     // multiKeys  : ['wrapperInner'],
    //     // moduleName: 'mod2',
    //   });
    //
    //   break;
    // }
    case 'module': {
      // CONTAINER
      await compile({
        tmplName: 'module/containers/_container.js',
        //name: props.name,
        ext: '.js',
        wrapperOuter: `src/${props.name}/containers`,
        // fileName: props.name,
      // multiKeys  : ['wrapperInner'],
      // moduleName: 'mod2',
      });

      // CONTAINER TEST
      await compile({
        tmplName: 'module/containers/__tests__/_container.spec.js',
        //name: props.name,
        ext: '.js',
        wrapperOuter: `src/${props.name}/containers/__tests__`,
        fileName: `${props.name}.spec`,
        // multiKeys  : ['wrapperInner'],
        // moduleName: 'mod2',
      });

      // COMPONENT
      await compile({
        tmplName: 'module/components/_component.js',
        wrapperOuter: `src/${props.name}/components`,
      });

      // COMPONENT TEST
      await compile({
        tmplName: 'module/components/__tests__/_component.spec.js',
        wrapperOuter: `src/${props.name}/components/__tests__`,
        fileName: `${props.name}.spec`,
      });

      // REDUCER
      await compile({
        tmplName: 'module/_reducer.js',
        wrapperOuter: `src/${props.name}`,
        fileName: 'reducer',
      });

      // SELECTORS
      await compile({
        tmplName: 'module/_selectors.js',
        wrapperOuter: `src/${props.name}`,
        fileName: 'selectors',
      });

      // ROUTE
      await compile({
        tmplName: 'module/_route.js',
        wrapperOuter: `src/${props.name}`,
        fileName: 'route',
      });

      // SAGA
      await compile({
        tmplName: 'module/_sagas.js',
        wrapperOuter: `src/${props.name}`,
        fileName: 'sagas',
      });

      break;
    }

    default:
      console.log('no match in generators');
      console.log('the action was skipped');
  }
}

module.exports = compileStrategy;
