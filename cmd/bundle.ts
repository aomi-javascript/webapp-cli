import * as webpack from 'webpack';

import prod from '../config/webpack.prod';
import getWebpackConfig from '../utils/getWebpackConfig';

/**
 * 执行打包任务
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  const config = getWebpackConfig('prod');
  webpack(config).run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    let method = 'log';
    if (stats.hasErrors()) {
      method = 'error'
    } else if (stats.hasWarnings()) {
      method = 'warn';
    }
    console[method](stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));
  });
}
