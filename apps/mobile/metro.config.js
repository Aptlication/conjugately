// Learn more: https://docs.expo.dev/guides/monorepos/
//
// The app lives in apps/mobile, but `shared/` at the repo root is code that
// BOTH surfaces run — the exam definitions and the Masters Mic answer matcher.
// Metro will not resolve imports outside its project root unless the folder is
// watched and the extra node_modules path is declared, so both are set here.
//
// Without this, `@shared/...` imports fail at bundle time with
// "Unable to resolve module" even though TypeScript is happy.

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const repoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the repo root so changes to shared/ trigger a rebuild.
config.watchFolders = [path.resolve(repoRoot, "shared")];

// Resolve node_modules from the app first, then the repo root.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(repoRoot, "node_modules"),
];

// Map the @shared alias Metro-side to match tsconfig's paths entry.
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@shared": path.resolve(repoRoot, "shared"),
};

module.exports = config;
