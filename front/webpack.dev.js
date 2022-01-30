const path = require("path");

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
    ],
  },
  output: {
    path: path.resolve(__dirname + "/dist"),
    publicPath: "/dist",
    filename: "bundle.js",
  },
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.join(__dirname) },
    hot: true,
    proxy: {
      "/todolist": "http://localhost:8000",
    },
  },
};
