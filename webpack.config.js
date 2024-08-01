import { resolve as _resolve } from "path";
import nodeExternals from "webpack-node-externals";

export const entry = "./src/server.ts";
export const target = "node";
export const externals = [nodeExternals()];
export const mode = "development";
export const module = {
  rules: [
    {
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: [".ts", ".js"],
};
export const output = {
  filename: "bundle.js",
  path: _resolve(__dirname, "dist"),
};
export const watch = true;