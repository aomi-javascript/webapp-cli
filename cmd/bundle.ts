import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import { execute as dll } from './dll';
import common from '../config/webpack.common';
import prod from '../config/webpack.prod';
import getUserWebpackConfig from '../utils/getUserWebpackConfig';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export async function execute() {
  await dll();
  const finalConfig = merge(common, prod, getUserWebpackConfig('common'), getUserWebpackConfig('prod'));
  webpack(finalConfig).run((err, stats) => {
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
