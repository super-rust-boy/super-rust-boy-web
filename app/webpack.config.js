const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

let pub = path.resolve(__dirname, "..", "..", "super-rust-boy-bin", "roms");

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
  module: {
    rules: [
      {
        test: /\.gb$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
