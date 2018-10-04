import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as WebpackDevServer from 'webpack-dev-server';

import common from '../config/webpack.common';
import config from '../config/webpack.dev';
import getUserWebpackConfig from '../utils/getUserWebpackConfig';


/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  const finalConfig = merge(
    common,
    config,
    getUserWebpackConfig('common'),
    getUserWebpackConfig('dev')
  );

  const compiler = webpack(finalConfig);

  const server = new WebpackDevServer(compiler);
  server.listen(finalConfig.devServer.port, finalConfig.devServer.host);
}
