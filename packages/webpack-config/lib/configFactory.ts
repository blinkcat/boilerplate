import webpack from 'webpack';
import getEntry from './entry';
import getOutput from './output';
import getModule from './module';
import getPlugins from './plugins';
import { ENV, isProd } from './env';
/**
 * @see https://webpack.js.org/configuration/mode/
 *
 * @param {ENV} env
 * @returns {webpack.Configuration['mode']}
 */
function getMode(env: ENV): webpack.Configuration['mode'] {
  switch (env) {
    case 'development':
      return 'development';
    case 'production':
      return 'production';
    default:
      return 'none';
  }
}
/**
 * @see https://webpack.js.org/configuration/devtool/
 *
 * @param {ENV} env
 * @returns {webpack.Configuration['devtool']}
 */
function getDevtool(env: ENV): webpack.Configuration['devtool'] {
  switch (env) {
    case 'development':
      return 'cheap-module-source-map';
    case 'production':
      return 'source-map';
    default:
      return false;
  }
}

export default function webpackConfigFactory(env: ENV): webpack.Configuration {
  return {
    // https://webpack.js.org/configuration/other-options/#bail
    bail: isProd(env),
    mode: getMode(env),
    devtool: getDevtool(env),
    entry: getEntry(env),
    output: getOutput(env),
    module: getModule(env),
    plugins: getPlugins(env),
  };
}
