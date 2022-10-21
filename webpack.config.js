const webpack = require("webpack");
const paths = require("./config/paths");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
//for webpack.development.js
const { HotModuleReplacementPlugin } = require("webpack");
//no longer need loadPreset.js and webpack.development.js 
module.exports = function () {
  return merge(
    {
      mode: 'development',
      devtool: false,
      entry: `${paths.srcPath}/index.js`,
      output: {
        path: paths.distPath,
        filename: "[name].bundle.js",
        publicPath: "/",
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ["babel-loader"],
            exclude: path.resolve(__dirname, "node_modules"),
          },
          {
            test: /\.mp3$/,
            use: {
            loader: 'url-loader',
          },
        },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          // Images: Copy image files to build folder
          { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

          // Fonts and SVGs: Inline files
          { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
        ],
      },
      resolve: {
        modules: [paths.srcPath, "node_modules"],
        extensions: [".js", ".jsx", ".json"],
      },
      devServer: {
        open: true,
        static: path.resolve(__dirname, "../dist"),
        port: 3000,
        compress: true,
      },
      plugins: [
        new CleanWebpackPlugin(),
        // Copies files from target to destination folder
        new CopyWebpackPlugin({
          patterns: [
            {
              from: paths.publicPath,
              to: "assets",
              globOptions: {
                ignore: ["*.DS_Store"],
              },
              noErrorOnMissing: true,
            },
          ],
        }),
        new HTMLWebpackPlugin({
          template: `${paths.publicPath}/index.html`,
        }),
        new webpack.ProgressPlugin(),
        new HotModuleReplacementPlugin()
      ],
    }
  );
};
