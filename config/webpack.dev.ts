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

export default {
  mode: 'development',
  devtool: userPkg.devtool || 'cheap-module-source-map',
  plugins,
  watchOptions: {
    ignored: /node_modules/
  }
};
