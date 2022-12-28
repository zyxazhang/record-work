const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin =require('copy-webpack-plugin')
const baseConfig = require("./webpack.base.js");
const path = require('path')
module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
    // new CopyWebpackPlugin([
      
    // ])
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.join(__dirname, '/images'),
    //       to: path.join(__dirname, 'dist/static/images')
    //     }
    //   ]
    // })
  ],
});