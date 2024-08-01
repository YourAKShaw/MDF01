import { fileURLToPath } from "url";
import { dirname, resolve as _resolve } from "path";
import nodeExternals from "webpack-node-externals";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./src/server.ts",
  target: "node",
  externals: [nodeExternals()],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: _resolve(__dirname, "dist"),
    libraryTarget: "module", // Use ES module output
  },
  experiments: {
    outputModule: true, // Enable module output
  },
  watch: true,
};
