import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
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
      'object-assign': path.join(moduleDir, 'object-assign'),
      react: path.join(moduleDir, 'react'),
      'react-dom': path.join(moduleDir, 'react-dom'),
      immutable: path.join(moduleDir, 'immutable'),
      classnames: path.join(moduleDir, 'classnames'),
      history: path.join(moduleDir, 'history'),
      rxjs: path.join(moduleDir, 'rxjs')
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
      env: process.env
    }),
    new MiniCssExtractPlugin({
      filename: `${styleDir}/[name]-[hash].css`,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new CleanWebpackPlugin([buildDir], {
      root: appHome
    }),
    new webpack.NoEmitOnErrorsPlugin(),
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
      test: /\.(tsx?)|(js)$/,
      use: [
        'babel-loader'
      ]
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
