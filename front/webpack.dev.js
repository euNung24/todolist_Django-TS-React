const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: "./src/index",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
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
      {
        test: /\.html$/,
        loader: "html-loader",
        options: { minimize: true },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
  ],
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "bundle.[hash].js",
  },
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    hot: true,
  },
};
