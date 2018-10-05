import * as merge from 'webpack-merge';
import common from '../config/webpack.common';

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
    require(`../config/webpack.${type}`),
    userCommon,
    getUserWebpackConfig(type)
  );
}
