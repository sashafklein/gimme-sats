const path = require("path");

module.exports = {
  entry: "./src/lib.ts",
  mode: "production",
  target: "node",
  externals: ["React"],
  output: {
    libraryTarget: "umd",
    path: path.resolve(__dirname, "./dist"),
    filename: "lib.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx$/,
        use: {
          loader: "ts-loader",
          options: { compilerOptions: { noEmit: false } },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
