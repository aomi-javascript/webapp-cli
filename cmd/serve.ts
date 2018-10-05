import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

import getWebpackConfig from '../utils/getWebpackConfig';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  const config = getWebpackConfig('dev');
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler);
  server.listen(config.devServer.port, config.devServer.host);
}
