import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const webpackConfig = {
  entry: {
    app: path.resolve(__dirname, './src/index')
  },
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "bundle.js", // string
    // the filename template for entry chunks
    // publicPath: "/dist/", // string
    // the url to the output directory resolved relative to the HTML page
  },

  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './src/')
        ],
        // exclude: [
        //   path.resolve(__dirname, './src')
        // ],
        loader: 'babel-loader',
        // options: {
        //   presets: ["es2015"]
        // },
      },

    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    // extensions that are used
  },
  devtool: 'cheap-source-map',

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    // ...
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'public/index.ejs'
    })
  ]
}

export { webpackConfig as default }