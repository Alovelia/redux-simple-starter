const webpack = require('webpack');
const packageJSON = require('../package.json');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
