import webpack from 'webpack';
import { ENV } from './env';
/**
 * @see https://webpack.js.org/configuration/entry-context/
 *
 * @export
 * @param {ENV} env
 * @returns {webpack.Configuration['entry']}
 */
export default function getEntry(env: ENV): webpack.Configuration['entry'] {
  switch (env) {
    case 'development':
      return './src/index.ts';
    default:
      return './src/index.ts';
  }
}
