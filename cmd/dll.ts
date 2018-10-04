import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import common from '../config/webpack.dll';
import getUserWebpackConfig from '../utils/getUserWebpackConfig';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  return new Promise((resolve, reject) => {
    const finalConfig = merge(
      common, {
        context: process.cwd()
      }, getUserWebpackConfig('dll')
    );
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
      console.log('bundle dll ok..');
      resolve();
    });
  });

}
