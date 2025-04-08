import tsConfigPaths from 'tsconfig-paths';
import { readFileSync } from 'fs';

const tsConfig = JSON.parse(readFileSync('./tsconfig.json', 'utf8'));
const { compilerOptions } = tsConfig;

tsConfigPaths.register({
  baseUrl: compilerOptions.baseUrl,
  paths: compilerOptions.paths,
}); 