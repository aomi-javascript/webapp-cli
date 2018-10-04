import * as fs from 'fs';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/4
 */
export default function getUserWebpackConfig(type) {
  const config = `${process.cwd()}/webpack.${type}.js`;

  let userConfig = {};
  try {
    if (fs.lstatSync(config).isFile()) {
      userConfig = require(config);
    }
  } catch (e) {
  }
  return userConfig;
}
