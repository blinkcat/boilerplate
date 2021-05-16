import webpack from 'webpack';
import { ENV } from './env';
import getCssRule, { getSassRule } from './styleRule';

function getScriptRule(): webpack.RuleSetRule {
  return {
    test: /\.(jsx?|tsx?|mjs)$/,
    include: ['src'],
    loader: 'babel-loader',
    options: {
      presets: ['@bo/babel-preset'],
      babelrc: false,
      configFile: false,
    },
  };
}

function getAssetRule(): webpack.RuleSetRule {
  // https://webpack.js.org/guides/asset-modules/#general-asset-type
  return {
    test: /\.(jpe?g|png|gif|bmp|svg)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 4 * 1024, // 4kb
      },
    },
  };
}

function getDefaultRule(): webpack.RuleSetRule {
  // https://webpack.js.org/migrate/3/#json-loader-is-not-required-anymore
  return {
    exclude: /\.(jsx?|tsx?|mjs|jpe?g|png|gif|bmp|svg|json|html)$/,
    type: 'asset/source',
  };
}

/**
 * @see https://webpack.js.org/configuration/module/
 *
 * @export
 * @param {ENV} env
 * @returns {webpack.Configuration['module']}
 */
export default function getModule(env: ENV): webpack.Configuration['module'] {
  return {
    rules: [
      {
        oneOf: [
          getAssetRule(),
          getCssRule(env),
          getCssRule(env, true),
          getSassRule(env),
          getSassRule(env, true),
          getScriptRule(),
          getDefaultRule(),
        ],
      },
    ],
  };
}
