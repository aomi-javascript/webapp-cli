import * as path from 'path';
import * as webpack from 'webpack';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';

const {NODE_ENV = 'development'} = process.env;

const appHome = process.cwd();
const buildDir = path.join(appHome, 'build', 'dll');

export default {
  entry: {
    polyfill: ['@babel/polyfill', 'whatwg-fetch', 'es6-promise']
  },
  output: {
    filename: '[name].dll.js',
    path: buildDir,
    library: '_dll_[name]_[hash]'
  },
  mode: NODE_ENV,
  devtool: NODE_ENV === 'production' ? false : 'source-map',
  plugins: [
    new CleanWebpackPlugin([buildDir]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.DllPlugin({
      name: '_dll_[name]_[hash]',
      path: path.join(buildDir, '[name].manifest.json') // manifest文件的输出路径
    })
  ]
};
