const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: "./src/index",
  },
  resolve: {
    extensions: [".js", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname + "/dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.join(__dirname) },
    hot: true,
  },
};
