import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import * as path from 'path';

import getWebpackConfig from '../utils/getWebpackConfig';

const appHome = process.cwd();
const userPkg = require(path.join(appHome, 'package.json'));

const defaultDevServer = {
  api: 'http://localhost:8080',
  host: '0.0.0.0',
  port: 3000
};

const { devServer = {} } = userPkg;

const newDevServer = {
  ...defaultDevServer,
  ...devServer
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  const config: any = getWebpackConfig('dev');
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: config.output.path,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: newDevServer.host,
    port: newDevServer.port,
    quiet: false,
    watchOptions: {
      ignored: [ 'node_modules' ],
      aggregateTimeout: 300,
      poll: 1500
    },
    proxy: {
      ...devServer.proxy,
      '/api/*': {
        target: newDevServer.api,
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  });
  server.listen(newDevServer.port, newDevServer.host);
}
