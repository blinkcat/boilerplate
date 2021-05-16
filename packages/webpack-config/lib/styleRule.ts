import webpack from 'webpack';
import { ENV } from './env';

const postCssLoader: webpack.RuleSetRule = {
  // https://webpack.js.org/loaders/postcss-loader/
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        'postcss-flexbugs-fixes',
        [
          'postcss-preset-env',
          // https://github.com/csstools/postcss-preset-env#options
          {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          },
        ],
      ],
    },
  },
};

function getStyleLoader(cssOptions: { [index: string]: any }, preProcessor?: string) {
  const loaders: webpack.RuleSetUseItem[] = [{ loader: 'css-loader', options: cssOptions }, postCssLoader];
  if (preProcessor) {
    loaders.push('resolve-url-loader', { loader: preProcessor, options: { sourceMap: true } });
  }
  return loaders;
}

const cssReg = /\.css$/;
const cssModuleReg = /\.module\.css$/;

export default function getCssRule(env: ENV, module = false): webpack.RuleSetRule {
  const rule: webpack.RuleSetRule = { test: cssReg, exclude: cssModuleReg, use: [] };

  if (module) {
    rule.test = cssModuleReg;
    rule.exclude = cssReg;
  }

  if (!Array.isArray(rule.use)) {
    return rule;
  }
  if (env === 'development') {
    rule.use.push('style-loader');
  } else {
    // todo
  }
  if (module) {
    rule.use.push(...getStyleLoader({ importLoaders: 1 }));
  } else {
    rule.use.push(
      ...getStyleLoader({
        importLoaders: 1,
        modules: { localIdentName: env === 'development' ? '[path][name]__[local]' : '[hash:base64]' },
      })
    );
  }
  return rule;
}

const sassReg = /\.s(a|c)ss$/;
const sassModuleReg = /\.module\.s(a|c)ss$/;

export function getSassRule(env: ENV, module = false): webpack.RuleSetRule {
  const rule: webpack.RuleSetRule = { test: sassReg, exclude: sassModuleReg, use: [] };

  if (module) {
    rule.test = sassModuleReg;
    rule.exclude = sassReg;
  }

  if (!Array.isArray(rule.use)) {
    return rule;
  }
  if (env === 'development') {
    rule.use.push('style-loader');
  } else {
    // todo
  }
  if (module) {
    rule.use.push(...getStyleLoader({ importLoaders: 3 }, 'sass-loader'));
  } else {
    rule.use.push(
      ...getStyleLoader(
        {
          importLoaders: 3,
          modules: { localIdentName: env === 'development' ? '[path][name]__[local]' : '[hash:base64]' },
        },
        'sass-loader'
      )
    );
  }
  return rule;
}
