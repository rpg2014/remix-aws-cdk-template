/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "build/public/assets",
  ignoredRouteFiles: ["**/.*"],
  publicPath: "/assets",
  serverBuildPath: "build/server/index.js",
  serverPlatform: "node",
  serverMinify: true,
  serverModuleFormat: "cjs",
  future: {},
};
