import webpack from 'webpack';
import path from 'path';
import { ENV } from './env';
/**
 * @see https://webpack.js.org/configuration/output/
 *
 * @export
 * @param {ENV} env
 * @returns {webpack.Configuration['output']}
 */
export default function getOutput(env: ENV): webpack.Configuration['output'] {
  switch (env) {
    case 'development':
      return {
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
      };
    default:
      return {
        path: path.resolve('./dist'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
        publicPath: '/',
      };
  }
}
