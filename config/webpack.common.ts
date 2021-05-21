import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
// import * as AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { getWebappConfig, WebappConfig } from '../utils/getWebappConfig';

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;

console.log(`NODE_ENV=${NODE_ENV}`);
const DEBUG = NODE_ENV !== 'production';
const PROD = NODE_ENV === 'production';

const appHome = process.cwd();
console.log(`APP_HOME=${appHome}`);
const srcDirs = path.join(appHome, 'src');
const buildDir = path.join(appHome, 'build', 'app');
const scriptDir = 'javascript';
const styleDir = 'stylesheets';
const imagesDir = 'images';
const fontDir = 'fonts';

const moduleDir = path.join(appHome, 'node_modules');

const userPkg: WebappConfig = getWebappConfig();

const dll = Object.keys(userPkg.dllEntry || {});

const assets = [{
  // Glob to match all of the dll file
  filepath: path.resolve(appHome, 'build/dll/*.dll.js'),
  publicPath: `./${scriptDir}`,
  outputPath: scriptDir
}];

function getImageLoader(mimetype) {
  return `url-loader?limit=10000&mimetype=${mimetype}&esModule=false&name=${imagesDir}/[name]-[hash].[ext]`;
}

const entry: any = {};
const plugins = [];

if (userPkg.mulitApp) {
  console.log('多应用程序');
  const appRoot = path.join(srcDirs, 'app');
  const appSrcDirs = fs.readdirSync(appRoot);
  appSrcDirs.forEach(app => {
    const entryFile = path.join(appRoot, app, 'index.web.tsx');
    console.log(`${app}入口JS: ${entryFile}`);
    entry[app] = entryFile;

    const indexHtmljs = path.join(appRoot, app, 'index.html.js');
    let template;
    if (fs.existsSync(indexHtmljs)) {
      template = indexHtmljs;
    } else {
      template = path.join(appRoot, app, 'index.html');
    }
    console.log(`${app}入口html： ${template}`);
    plugins.push(new HtmlWebpackPlugin({
      template,
      filename: `${app}.html`,
      debug: DEBUG,
      env: process.env,
      excludeChunks: appSrcDirs.filter(item => item !== app)
    }));
  });
} else {
  console.log('单用程序');
  entry.app = path.join(srcDirs, 'index.web.tsx');
  plugins.push(new HtmlWebpackPlugin({
    template: path.join(srcDirs, 'index.html.js'),
    debug: DEBUG,
    env: process.env
  }));
}


const faviconPng = path.join(srcDirs, 'assets', 'images', 'favicon.png');
const faviconJpg = path.join(srcDirs, 'assets', 'images', 'favicon.jpg');
const faviconSvg = path.join(srcDirs, 'assets', 'images', 'favicon.svg');

let favicon = null;
if (fs.existsSync(faviconPng)) {
  favicon = faviconPng;
} else if (fs.existsSync(faviconJpg)) {
  favicon = faviconJpg;
} else if (fs.existsSync(faviconSvg)) {
  favicon = faviconSvg;
}
if (favicon) {
  console.log(`发现favicon: ${favicon}`);
  plugins.push(new FaviconsWebpackPlugin({
    logo: favicon,
    outputPath: path.join(imagesDir, 'favicon'),
    publicPath: 'images',
    prefix: 'favicon/'
  }));
}

export default {
  entry,
  output: {
    path: buildDir,
    filename: DEBUG ? `${scriptDir}/[name].bundle.js` : `${scriptDir}/[name]-[contenthash].bundle.js`,
    chunkFilename: DEBUG ? `${scriptDir}/[id].chunk.js` : `${scriptDir}/[id]-[fullhash].chunk.js`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.sass', 'scss', '.png', '.jpg', '.jpeg'],
    alias: {
      '@': srcDirs
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
    ...plugins,
    new MiniCssExtractPlugin({
      filename: DEBUG ? `${styleDir}/[name].css` : `${styleDir}/[name].[fullhash].css`,
      chunkFilename: DEBUG ? `${styleDir}/[id].css` : `${styleDir}/[id].[fullhash].css`
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    // new AddAssetHtmlPlugin(assets),
    ...dll.map(dllName => new webpack.DllReferencePlugin({
      context: appHome,
      manifest: require(`${appHome}/build/dll/${dllName}.manifest.json`)
    }))
  ],
  module: {
    rules: [{
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: srcDirs,
      use: ['babel-loader']
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }, {
      test: /\.md$/,
      use: [{
        loader: 'html-loader'
      }, {
        loader: 'markdown-loader',
        options: {
          ...(userPkg.markedOptions || {})
        }
      }]
    }, {
      test: /\.css$/,
      exclude: /\.module\.css$/i,
      use: [DEBUG ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: DEBUG,
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: DEBUG, postcssOptions: {
            plugins: [
              'postcss-preset-env'
            ]
          }
        }
      }]
    }, {
      // For CSS modules
      test: /\.module\.css$/i,
      use: [DEBUG ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: DEBUG,
          importLoaders: 1,
          modules: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: DEBUG,
          postcssOptions: {
            plugins: [
              'postcss-preset-env'
            ]
          }
        }
      }]
    }, {
      // For CSS modules
      test: /\.less$/,
      exclude: /\.module\.less$/i,
      use: [DEBUG ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: DEBUG,
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: DEBUG,
          postcssOptions: {
            plugins: [
              'postcss-preset-env'
            ]
          }
        }
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: DEBUG,
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }]
    }, {
      // For CSS modules
      test: /\.module\.less$/i,
      use: [DEBUG ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: DEBUG,
          importLoaders: 1,
          modules: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: DEBUG,
          postcssOptions: {
            plugins: [
              'postcss-preset-env'
            ]
          }
        }
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: DEBUG,
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }]
    }, {
      test: /\.(sa|sc)ss$/,
      exclude: /\.module\.(sa|sc)ss$/i,
      use: [DEBUG ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: DEBUG,
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: DEBUG, postcssOptions: {
            plugins: [
              'postcss-preset-env'
            ]
          }
        }
      }, {
        loader: 'sass-loader',
        options: { sourceMap: DEBUG }
      }]
    }, {
      test: /\.module\.(sa|sc|c)ss$/i,
      use: [DEBUG ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: DEBUG,
          importLoaders: 1,
          modules: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: DEBUG, postcssOptions: {
            plugins: [
              'postcss-preset-env'
            ]
          }
        }
      }, {
        loader: 'sass-loader',
        options: { sourceMap: DEBUG }
      }]
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
      test: /\.(woff|eot|ttf|xls|xlsx|doc|docx)/,
      use: [`file-loader?name=${fontDir}/[name]-[hash].[ext]`]
    }]
  }
};
