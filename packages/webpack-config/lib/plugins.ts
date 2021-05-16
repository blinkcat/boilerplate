import webpack from 'webpack';
import { ENV } from './env';
/**
 * @see https://webpack.js.org/configuration/plugins/
 *
 * @export
 * @param {ENV} env
 * @returns {webpack.Configuration['plugins']}
 */
export default function getPlugins(env: ENV): webpack.Configuration['plugins'] {
  switch (env) {
    case 'development':
      return [];
    default:
      return [];
  }
}
