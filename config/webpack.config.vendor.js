const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const packageJSON = require('../package.json');
const paths = require('./paths');
const getClientEnvironment = require('./env');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  entry: {
    vendor: Object.keys(packageJSON.dependencies)
      .filter((key) => {
        return ~['lodash', 'ramda', 'recompose', 'moment']
          .indexOf(key);
      }),
  },
  output: {
    path: path.resolve(__dirname, '../public/static/vendor'),
    filename: '[name]_[hash].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    // https://github.com/moment/moment/issues/2517#issuecomment-185836313
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
    new CleanWebpackPlugin([
      '*.json',
      '*.js'
    ], {
      root: path.resolve(__dirname, '../public/static/vendor')
    }),
    new webpack.DllPlugin({
      path: 'public/static/vendor/[name]-manifest.json',
      name: '[name]_[hash]'
    }),
    // process.env.NODE_ENV !== 'production'
    //   ? () => {}
    //   :
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      },
      sourceMap: false,
    }),
  ]
};
