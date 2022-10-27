const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true
    // publicPath指定静态资源前缀
    // publicPath:'https://cdn.xxxx.com/assets/',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset",
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(eot|svg|ttf|woff2?|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]-[hash][ext]",
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "record-work",
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
    // new FriendlyErrorsWebpackPlugin({
    //   compilationSuccessInfo: {
    //     messages: [`Your application is running here: http://localhost:8080`]
    //   },
    //   clearConsole: true
    // })
  ],
  cache: {
    type: "filesystem",
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: [".vue", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
};