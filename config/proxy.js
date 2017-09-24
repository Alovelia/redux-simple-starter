module.exports = {
  // https://webpack.github.io/docs/webpack-dev-server.html#proxy
  // https://github.com/chimurai/http-proxy-middleware#options
  '/api': {
    target: 'https://other-server.example.com',
    changeOrigin: true,
    secure: false,
    // headers: {
    //   'Host': 'other-server.example.com',
    //   'Cookie': '' // send cookie on demand
    // },
    pathRewrite(path) {
      return path.replace(/^\/api/, ''); // remove '/api' prefix when requesting
    }
  }
};
