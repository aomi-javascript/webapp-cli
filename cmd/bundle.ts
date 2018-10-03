import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as fs from 'fs-extra';

import { execute as dll } from './dll';
import common from '../config/webpack.prod';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  const config = `${process.cwd()}/webpack.prod.js`;

  let userProdConfig = {};
  try {
    if (fs.lstatSync(userProdConfig).isFile()) {
      userProdConfig = require(config);
    }
  } catch (e) {
  }
  const finalConfig = merge(common, userProdConfig);
  dll(() => {
    webpack(finalConfig).run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.error(err);
        return;
      }
      console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true    // Shows colors in the console
      }));
    });
  });
}
