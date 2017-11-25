Redux advanced starter

1. Yarn commands
- `yarn start` - runs application
- `yarn test:snapshot` - to create snapshots for your components.
  You should run this component only if you sure that your work is stable
  and could be fixed in snapshots.

2. To enable webstorm to see aliases from webpack:
 - go to settings;
 - search for webpack;
 - add config file from ./config/webpack.config.dev.js.

3. [webpack-conditional-loader](https://github.com/caiogondim/webpack-conditional-loader)

  It's even more then Webpack.DefinePlugin.
  It could be placed anywhere
    ```
    //#if process.env.NODE_ENV === 'development'
      component: require('./containers/Home').default
    // #endif
    ```

- few words about dependencies and devDependencies.
    dependencies will be automatically compiled to vendor.js
    Therefore I installed `intl` to devDependencies.
    For this library separate chunk will be created due to
    architecture.
    Also moved `moment`, `lodash`, `ramda`, `recompose`
    Reason is the same - these libraries has custom workflow with
    webpack and babel plugins
    and their size too big for vendor dll file.

4. Keys in locales should be ordered alphabeticaly in `kebab-case`
    Module name is on the first position then dot and then text code:
    `module-name.text-code`

5. Component classes should be named as `${moduleName}Component`
6. Container classes should be named as `${moduleName}Container`

7. .env files
.env is read by default.
.env.${NODE_ENV} - next by priority
to use new variable it should be added to /config/env.js to
`getClientEnvironment` explicitly

8. For testing there are a lot of variants
The project also works with chai
https://github.com/astorije/chai-immutable
https://github.com/domenic/chai-as-promised
https://github.com/prodatakey/dirty-chai
https://github.com/domenic/sinon-chai

9. Flow support
https://flow.org
Read how to add WebStorm support
https://blog.jetbrains.com/webstorm/2016/11/using-flow-in-webstorm/

10. Error boundary
https://github.com/bvaughn/react-error-boundary

Warnings:
- Recompose `lifecycle` doesn't persist component `state` in HMR
  but works for `reduxStore`
