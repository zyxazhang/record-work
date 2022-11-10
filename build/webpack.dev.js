const { merge } = require("webpack-merge");
const path = require('path')
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "development",
  target: "web",
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true
  }
});