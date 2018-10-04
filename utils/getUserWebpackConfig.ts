import * as fs from 'fs';
import * as path from 'path';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/4
 */
export default function getUserWebpackConfig(type) {
  const config = path.join(process.cwd(), `webpack.${type}.js`);
  let userConfig = {};
  try {
    if (fs.lstatSync(config).isFile()) {
      try {
        userConfig = require(config);
      } catch (e) {
        console.error(e.message, e);
        process.exit(1);
      }
    }
  } catch (e) {
  }
  return userConfig;
}
