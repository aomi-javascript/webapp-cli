const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {NODE_ENV = 'development'} = process.env;

const DEBUG = NODE_ENV !== 'production';

const appHome = process.cwd();

const srcDirs = path.resolve(appHome, 'src');
const buildDir = 'build/app';
const scriptDir = 'javascript';
const styleDir = 'stylesheets';
const imagesDir = 'images';
const fontDir = 'fonts';

const dll = ['polyfill'];

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
    app: './src/index.tsx'
  },
  output: {
    path: path.join(appHome, buildDir),
    filename: `${scriptDir}/[name]-[hash].bundle.js`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.sass', 'scss', '.png', '.jpg', '.jpeg'],
    alias: {
      'object-assign': path.resolve(path.join(appHome, 'node_modules', 'object-assign')),
      react: path.resolve(path.join(appHome, 'node_modules', 'react')),
      'react-dom': path.resolve(path.join(appHome, 'node_modules', 'react-dom')),
      immutable: path.resolve(path.join(appHome, 'node_modules', 'immutable'))
    },
    modules: [
      'node_modules'
    ]
  },
  mode: NODE_ENV,
  plugins: [
    new webpack.DefinePlugin({ // 定义环境变量
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDirs, 'index.html.js'),
      debug: DEBUG
    }),
    new MiniCssExtractPlugin({
      filename: `${styleDir}/[name]-[hash].css`,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new CleanWebpackPlugin([buildDir]),
    new webpack.NoEmitOnErrorsPlugin(),
    new AddAssetHtmlPlugin(assets),
    ...dll.map(dllName => new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`${appHome}/build/dll/${dllName}.manifest.json`)
    }))
  ],
  module: {
    rules: [{
      test: /\.(tsx|ts)$/,
      use: 'awesome-typescript-loader',
      include: srcDirs // 指定需要加载的文件夹
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
        'postcss-loader',
        'css-loader'
      ]
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        DEBUG ? 'style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader',
        'postcss-loader',
        'sass-loader',
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
