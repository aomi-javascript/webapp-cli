import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import * as SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

import getWebpackConfig from '../utils/getWebpackConfig';
import { getWebappConfig } from '../utils/getWebappConfig';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  const config: any = getWebpackConfig('dev');
  const smp = new SpeedMeasurePlugin();
  const configWrapper = smp.wrap(config);
  const compiler = webpack(configWrapper);

  const { devServer: userDevUser = {} }: any = getWebappConfig();

  const { api, ...devServer } = userDevUser;

  const serverConfig = {
    hot: true,
    contentBase: config.output.path,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    quiet: false,
    watchOptions: {
      ignored: ['node_modules'],
      aggregateTimeout: 300,
      poll: 1500
    },
    proxy: {
      '/api/*': {
        target: api || 'http://localhost:8080',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    },
    ...devServer
  };
  const server = new WebpackDevServer(compiler, serverConfig);
  server.listen(serverConfig.port, serverConfig.host);
}
