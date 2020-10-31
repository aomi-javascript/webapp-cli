import { merge } from 'webpack-merge';
import common from '../config/webpack.common';
import devConfig from '../config/webpack.dev';
import prodConfig from '../config/webpack.prod';

import getUserWebpackConfig from './getUserWebpackConfig';
import checkLoader from './checkLoader';

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/5
 */
export default function getWebpackConfig(type) {
  const userCommon = getUserWebpackConfig('common');
  checkLoader(common, userCommon);
  return merge(
    common,
    type === 'prod' ? prodConfig : devConfig,
    userCommon,
    getUserWebpackConfig(type)
  );
}
