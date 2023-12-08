import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [remix({
    appDirectory: "app",
    assetsBuildDirectory: "build/public/assets",
    ignoredRouteFiles: ["**/.*"],
    publicPath: "/assets",
    serverBuildPath: "build/server/index.js",
    // I cant get lambda to fully support esm, i get dynamic import related errors. 
    serverModuleFormat: "cjs",
  }), tsconfigPaths(),
  wasm()],
});