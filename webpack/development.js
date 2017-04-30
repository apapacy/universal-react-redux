import baseConfig from './base';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { CSS_MODULES_IDENTIFIER } from './constants';

const plugins = [
  new ExtractTextPlugin('styles.css')
];

const loaders = [
  {
    test: /\.jsx$|\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            minimize: false,
            importLoaders: 1,
            localIdentName: CSS_MODULES_IDENTIFIER
          }
        },
        { loader: 'postcss-loader' },
        { loader: 'sass-loader' }
      ]
    })
  }
];

export default {
  ...baseConfig,
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
    ...plugins
  ],
  module: { ...baseConfig.module, ...{
    rules: [
      ...baseConfig.module.rules,
      ...loaders
    ]
  }}
};
