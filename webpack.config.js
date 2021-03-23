const nodepath = require("path");
const resolvePath = (path) => nodepath.resolve(__dirname, path);

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_PATH = "./app-client";

module.exports = {
  mode: "production",

  watchOptions: {
    ignored: ["node_modules", "app-server", "stories", "test", "dist"],
  },

  context: resolvePath(`${BASE_PATH}/src`),
  entry: ["./js/main.js"],

  output: {
    publicPath: "/",
    path: resolvePath(`${BASE_PATH}/dist`),
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
  ],
};
