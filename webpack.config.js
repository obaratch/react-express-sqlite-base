const webpack = require("webpack");
const nodepath = require("path");
const resolvePath = (path) => nodepath.resolve(__dirname, "./app-client", path);
const { NODE_ENV = "" } = process.env;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isDev = NODE_ENV.toLowerCase().startsWith("dev");

module.exports = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "eval-source-map" : "source-map",
  devServer: {
    historyApiFallback: true,
  },

  watchOptions: {
    ignored: ["node_modules", "app-server", "stories", "test", "dist"],
  },

  context: resolvePath("./src"),
  entry: ["./js/main.js"],

  output: {
    publicPath: "/",
    path: resolvePath("./dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: "css-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: "./style/style.css" }),
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new webpack.DefinePlugin({
      __$APP_VER$__: `"${require("./package.json").version}"`,
      __$BUILD_TIME$__: Date.now(),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolvePath("./src/assets"),
          to: resolvePath("./dist/"),
        },
      ],
    }),
  ],
};
