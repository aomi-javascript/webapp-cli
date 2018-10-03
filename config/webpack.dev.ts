import * as webpack from 'webpack';
import common from './webpack.common';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: common.output.path,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    quiet: false,
    watchOptions: {
      poll: 1000
    }
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
