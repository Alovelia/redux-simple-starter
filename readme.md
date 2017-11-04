Redux simple starter


`yarn prebuild` is usefull when you run application for the first time.
It will prebuild all external libraries to dll dependencies
and `yarn start` will work faster.
When you update libraries you can repeat this command.

`yarn test:snapshot` - to create snapshots for your components.
You should run this component only if you sure that your work is stable
and could be fixed in snapshots.

2. To enable webstorm see aliases from webpack go to settings search for
webpack and add config file from ./config/webpack.config.dev.js.

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
Therefore I installed intl to devDependencies.
For this library separate chunk will be created due to
architecture.