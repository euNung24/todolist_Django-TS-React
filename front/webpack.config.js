const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env) {
  const isDevMode = env.development;

  return (
    {
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
            test: /\.tsx?/,
            use: [
              {
                loader: "babel-loader",
                // options: {
                //   plugins: !isDevMode ? ["transfrom-remove-console", { exclude: ["error", "warn"] }] : []
                // }
              },
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
        !isDevMode && new CleanWebpackPlugin(),
      ].filter(Boolean),
      output: {
        path: path.resolve(__dirname + "/dist"),
        filename: "bundle.[chunkhash].js",
        publicPath: "/",
      },
      optimization: {
        minimize: true,
        runtimeChunk: 'single',
      },
      ...(isDevMode && {
        devServer: {
          static: { directory: path.join(__dirname, 'dist') },
          hot: true,
        }
      }),
    }
)
}
