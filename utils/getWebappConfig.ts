import * as fs from 'fs';
import * as path from 'path';
import { Configuration } from 'webpack-dev-server';

export interface WebappConfig {
  devtool?: string | false;
  bundleAnalyzerPlugin?: object | boolean;

  /**
   * 是否是多入口应用
   * 如果是，则自动读取src/app下的文件夹作为入口文件。
   */
  mulitApp?: boolean;
  /**
   * dll 配置
   */
  dllEntry?: object;

  /**
   * markdown-loader options
   */
  markedOptions?: object;

  devServer?: Configuration & {
    api?: string
  };
}

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/4
 */
export function getWebappConfig(): WebappConfig {
  const config = path.join(process.cwd(), `webapp.config.js`);
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
