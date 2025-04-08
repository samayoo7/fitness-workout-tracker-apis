const tsConfigPaths = require('tsconfig-paths');
const { compilerOptions } = require('./tsconfig.json');

tsConfigPaths.register({
  baseUrl: compilerOptions.baseUrl,
  paths: compilerOptions.paths,
}); 