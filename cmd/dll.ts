import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import * as path from 'path';

import common from '../config/webpack.dll';
import getUserWebpackConfig from '../utils/getUserWebpackConfig';

const appHome = process.cwd();
const userPkg = require(path.join(appHome, 'package.json'));

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  return new Promise((resolve, reject) => {
    if (!userPkg.dllEntry) {
      console.info('package.json 没有配置`dllEntry`');
      resolve();
      return;
    }

    const finalConfig = merge(common, getUserWebpackConfig('dll'));
    webpack(finalConfig, (err, stats) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true    // Shows colors in the console
      }));
      console.log('bundle dll ok...');
      resolve();
    });
  });

}
