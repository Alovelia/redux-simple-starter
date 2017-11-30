/*
 * This is a main file which decides what to do with particular subgenerator
 * It will be invoked if subgenerators option was chosen
 * */

let compileTpl = require('./core'),
  path = require('path'),
  _ = require('../utils/mixins'),
  config = require('../../app/config'),
  { compiler, multiOption } = require('./core'),
  { injector } = require('../inject/core');

async function compileStrategy(props) {
  const compile = compiler(props);
  const inject = injector(props);

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
        wrapperOuter: `src/${props.name}/containers`,
      });

      // CONTAINER TEST
      await compile({
        tmplName: 'module/containers/__tests__/_container.spec.js',
        wrapperOuter: `src/${props.name}/containers/__tests__`,
        fileName: `${props.name}.spec`,
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

      // REDUCER TEST
      await compile({
        tmplName: 'module/__tests__/_reducer.spec.js',
        wrapperOuter: `src/${props.name}/__tests__`,
        fileName: 'reducer.spec',
      });

      // SELECTORS
      await compile({
        tmplName: 'module/_selectors.js',
        wrapperOuter: `src/${props.name}`,
        fileName: 'selectors',
      });

      // SELECTORS TEST
      await compile({
        tmplName: 'module/__tests__/_selectors.spec.js',
        wrapperOuter: `src/${props.name}/__tests__`,
        fileName: 'selectors.spec',
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

      // SAGA TEST
      await compile({
        tmplName: 'module/__tests__/_sagas.spec.js',
        wrapperOuter: `src/${props.name}/__tests__`,
        fileName: 'sagas.spec',
      });

      // INJECT ROUTE TO MAIN ROUTE
      await inject({
        rules: 'route-to-app-route',
        wrapperOuter: 'src/__app__',
        fileName: 'routes',
      });

      // INJECT INTL TO MAIN INTL
      await inject({
        rules: 'intl-to-main-intl',
        wrapperOuter: 'src/__i18n__',
        fileName: 'en',
        ext: '.json',
      });

      // INJECT SAGA TO ROOT SAGA - FOR DEV ONLY
      await inject({
        rules: 'saga-to-root-saga',
        wrapperOuter: 'src/__app__',
        fileName: 'sagas',
      });

      // INJECT REDUCER TO ROOT REDUCER - FOR DEV ONLY
      await inject({
        rules: 'reducer-to-root-reducer',
        wrapperOuter: 'src/__app__/reducers',
        fileName: 'index',
      });

      // INJECT ROUTE_CONFIG TO ROOT ROUTE CONFIG
      await inject({
        rules: 'route-to-app-route-config',
        wrapperOuter: 'src/__app__',
        fileName: 'routes-config',
      });

      break;
    }

    default:
      console.log('no match in generators');
      console.log('the action was skipped');
  }
}

module.exports = compileStrategy;
