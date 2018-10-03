import * as path from 'path';
import webpack from 'webpack';

const {NODE_ENV = 'development'} = process.env;

const buildDir = path.join(__dirname, 'build', 'dll');

export default {
  entry: {
    polyfill: ['whatwg-fetch', 'es6-promise']
  },
  output: {
    filename: '[name].dll.js',
    path: buildDir,
    library: '_dll_[name]_[hash]' // 全局变量名
  },
  mode: NODE_ENV,
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]_[hash]',
      path: path.join(buildDir, '[name].manifest.json') // manifest文件的输出路径
    })
  ]
};
