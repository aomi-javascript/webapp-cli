import * as webpack from 'webpack';
import merge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import * as fs from 'fs-extra';

import common from '../config/webpack.common';
import config from '../config/webpack.dev';


/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  const devConfig = `${process.cwd()}/webpack.dev.js`;

  let userDevConfig = {};
  if (fs.lstatSync(devConfig).isFile()) {
    userDevConfig = require(devConfig);
  }

  const finalConfig = merge(common, config, userDevConfig);

  const compiler = webpack(finalConfig);

  const server = new WebpackDevServer(compiler);
  server.listen(finalConfig.devServer.port, finalConfig.devServer.host);
}
