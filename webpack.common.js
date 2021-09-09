const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/trending.html",
      filename: "trending.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/now-playing.html",
      filename: "now-playing.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/movie-detail.html",
      filename: "movie-detail.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/search-result.html",
      filename: "search-result.html",
    }),
  ],
};
