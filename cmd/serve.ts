import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import * as SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

import getWebpackConfig from '../utils/getWebpackConfig';
import { getWebappConfig } from '../utils/getWebappConfig';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export async function execute() {
  const config: any = getWebpackConfig('dev');
  const smp = new SpeedMeasurePlugin();
  const configWrapper = smp.wrap(config);

  const { devServer } = getWebappConfig();
  const { api, ...otherDevServer } = devServer || {};

  const serverConfig = {
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    client: {
      progress: true
    },
    proxy: {
      '/api/*': {
        target: api || 'http://localhost:8080',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    },
    open: true,
    ...otherDevServer
  };


  const compiler = webpack(configWrapper);

  const server = new WebpackDevServer(serverConfig, compiler);
  await server.start();
}
