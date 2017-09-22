const webpack = require('webpack');
const packageJSON = require('../package.json');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  entry: {
    vendor: Object.keys(packageJSON.dependencies),
  },
  output: {
    path: path.resolve(__dirname, '../public/static/vendor'),
    filename: '[name]_[hash].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'public/static/vendor/[name]-manifest.json',
      name: '[name]_[hash]'
    }),
    // TODO - investigate what is really faster when
    // I have a lot if libraries in package.json at the moment no difference even slower
    // new ParallelUglifyPlugin({
    //   uglifyJS: {
    //     compress: {
    //       // https://github.com/mishoo/UglifyJS2#compress-options
    //       sequences: true,
    //       booleans: true,
    //       loops: true,
    //       unused: true,
    //       warnings: false,
    //       drop_console: true,
    //       unsafe: true,
    //       dead_code: true,
    //       comparisons: false,
    //     }
    //   },
    // }),
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
