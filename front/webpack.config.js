const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs");

module.exports = function (env) {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + "/.env";
  const envPath = basePath + "." + env.mode;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  console.log(envKeys);
  const isDevMode = envKeys["NODE_ENV"] === "development";

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
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
        inject: "body",
      }),
      // isDevMode && new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin(envKeys),
    ].filter(Boolean),
    output: {
      path: path.resolve(__dirname + "/dist"),
      filename: "bundle.[chunkhash].js",
      publicPath: "/",
      clean: true,
    },
    // optimization: {
    //   minimize: true,
    //   runtimeChunk: "single",
    // },
    ...(isDevMode && {
      devServer: {
        static: { directory: path.join(__dirname, "dist") },
        hot: true,
      },
    }),
  };
};
