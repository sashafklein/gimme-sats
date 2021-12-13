const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  mode: "production",
  target: "node",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.bundle.js",
  },
  module: {
    rules: [{ test: /\.ts|tsx$/, use: "ts-loader" }],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
