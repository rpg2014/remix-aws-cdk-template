module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/jest-testing-library", "eslint-config-prettier"],
  ignorePatterns: ["node_modules", "cdk.out", ".cache", ".idea", ".yarn", "build"],
};
