import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

const {NODE_ENV = 'development'} = process.env;

console.log(`NODE_ENV=${NODE_ENV}`);
const DEBUG = NODE_ENV !== 'production';

const appHome = process.cwd();
console.log(`APP_HOME=${appHome}`);
const srcDirs = path.join(appHome, 'src');
const buildDir = path.join(appHome, 'build', 'app');
const scriptDir = 'javascript';
const styleDir = 'stylesheets';
const imagesDir = 'images';
const fontDir = 'fonts';

const moduleDir = path.join(appHome, 'node_modules');

const userPkg = require(path.join(appHome, 'package.json'));

const dll = Object.keys(userPkg.dllEntry || {});

const assets = [{
  // Glob to match all of the dll file
  filepath: path.resolve(appHome, 'build/dll/*.dll.js'),
  publicPath: `./${scriptDir}`,
  outputPath: scriptDir,
}];

function getImageLoader(mimetype) {
  return `url-loader?limit=10000&mimetype=${mimetype}&name=${imagesDir}/[name]-[hash].[ext]`;
}

export default {
  entry: {
    app: path.join(srcDirs, 'index.web.tsx')
  },
  output: {
    path: buildDir,
    filename: `${scriptDir}/[name]-[hash].bundle.js`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.sass', 'scss', '.png', '.jpg', '.jpeg'],
    alias: {
      antd: path.join(moduleDir, 'antd'),
      'object-assign': path.join(moduleDir, 'object-assign'),
      react: path.join(moduleDir, 'react'),
      'react-dom': path.join(moduleDir, 'react-dom'),
      immutable: path.join(moduleDir, 'immutable'),
      classnames: path.join(moduleDir, 'classnames'),
      history: path.join(moduleDir, 'history'),
      rxjs: path.join(moduleDir, 'rxjs'),
      lodash: path.join(moduleDir, 'lodash')
    },
    modules: [
      'node_modules'
    ]
  },
  context: appHome,
  plugins: [
    new webpack.DefinePlugin({ // 定义环境变量
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDirs, 'index.html.js'),
      debug: DEBUG,
      env: process.env,
      chunksSortMode: 'none'
    }),
    new MiniCssExtractPlugin({
      filename: `${styleDir}/[name]-[hash].css`,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new CleanWebpackPlugin(),
    new AddAssetHtmlPlugin(assets),
    ...dll.map(dllName => new webpack.DllReferencePlugin({
      context: appHome,
      manifest: require(`${appHome}/build/dll/${dllName}.manifest.json`)
    }))
  ],
  module: {
    rules: [{
      test: /\.(tsx?|js)$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      include: srcDirs
    }, {
      test: DEBUG ? /\.tsx?$/ : /\.(tsx?)|(js)$/,
      use: [DEBUG ? 'awesome-typescript-loader' : 'babel-loader']
    }, {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: '../'
        }
      },
        {loader: 'css-loader', options: {sourceMap: DEBUG, importLoaders: 1}},
        {loader: 'postcss-loader', options: {sourceMap: DEBUG}}
      ]
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        {loader: 'css-loader', options: {sourceMap: DEBUG, importLoaders: 1}},
        {loader: 'postcss-loader', options: {sourceMap: DEBUG}},
        {loader: 'sass-loader', options: {sourceMap: DEBUG}}
      ]
    }, {
      test: /\.gif/,
      use: getImageLoader('image/gif')
    }, {
      test: /\.jpg/,
      use: getImageLoader('image/jpg')
    }, {
      test: /\.png/,
      use: getImageLoader('image/png')
    }, {
      test: /\.svg/,
      use: getImageLoader('image/svg+xml')
    }, {
      test: /\.(woff|eot|ttf)/,
      use: [`file-loader?name=${fontDir}/[name]-[hash].[ext]`]
    }]
  }
};
