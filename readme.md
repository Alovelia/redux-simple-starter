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
