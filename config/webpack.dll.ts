import * as path from 'path';
import * as webpack from 'webpack';

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
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]_[hash]',
      path: path.join(buildDir, '[name].manifest.json') // manifest文件的输出路径
    })
  ]
};
