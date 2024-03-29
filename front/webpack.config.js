const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = function (env) {
  const isDevMode = env.mode === "development";
  dotenv.config({
    path: isDevMode ? "./.env.development" : "../.vercel/.env.production.local",
  });
  return {
    mode: isDevMode ? "development" : "production",
    devtool: isDevMode ? "inline-source-map" : "source-map",
    entry: {
      app: "./src/index",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|js)$/,
          use: [
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
        {
          test: /\.png/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
        inject: "body",
        favicon: "./favicon.png",
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      // new Dotenv({
      //   systemvars: true, // 해당 옵션을 추가 작성
      // }),
      // isDevMode && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    output: {
      path: path.resolve(__dirname + "/dist"),
      filename: "bundle.[chunkhash].js",
      publicPath: "/",
      clean: true,
    },
    ...(isDevMode && {
      devServer: {
        static: { directory: path.join(__dirname, "dist") },
        hot: true,
      },
    }),
  };
};
