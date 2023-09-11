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
  serverModuleFormat: "cjs",
  future: {
    v2_headers: true,
    v2_routeConvention: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_dev: true,
    v2_errorBoundary: true,
  },
};
