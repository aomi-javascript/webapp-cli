import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { getWebappConfig, WebappConfig } from '../utils/getWebappConfig';

const userPkg: WebappConfig = getWebappConfig();

const plugins = [];

if (typeof userPkg.bundleAnalyzerPlugin === 'boolean' && userPkg.bundleAnalyzerPlugin) {
  plugins.push(new BundleAnalyzerPlugin());
} else if (typeof userPkg.bundleAnalyzerPlugin === 'object') {
  plugins.push(new BundleAnalyzerPlugin(userPkg.bundleAnalyzerPlugin));
}

plugins.push(new webpack.HotModuleReplacementPlugin());

/**
 * cheap-module-source-map 一般来说，生产环境是不配 source-map 的，如果想捕捉线上的代码报错，我们可以用这个
 */
export default {
  mode: 'development',
  devtool: userPkg.devtool || 'inline-source-map',
  plugins,
  watchOptions: {
    ignored: /node_modules/
  }
};
