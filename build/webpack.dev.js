const { merge } = require("webpack-merge");
const path = require('path')
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "development",
  target: "web",
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './static'),
    },
    proxy: {
      '/': {
        target: 'http://localhost:3002',
        changeOrigin: true
      }
    },
    compress: true,
    port: 8080,
    open: false,
    hot: true
  }
});