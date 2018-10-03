import * as webpack from 'webpack';
import common from './webpack.common';

export default {
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
