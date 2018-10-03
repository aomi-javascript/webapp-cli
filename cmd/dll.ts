import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as fs from 'fs-extra';

import common from '../config/webpack.dll';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute(callback) {
  const dllConfig = `${process.cwd()}/webpack.dll.js`;

  let userDllConfig = {};

  try {
    if (fs.lstatSync(dllConfig).isFile()) {
      userDllConfig = require(dllConfig);
    }
  } catch (e) {
  }

  const finalConfig = merge(common, {
    context: process.cwd()
  }, userDllConfig);
  webpack(finalConfig, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));
    console.log('bundle dll ok..');
    callback && callback();
  });
}
