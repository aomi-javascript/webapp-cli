import getWebpackConfig from "./getWebpackConfig";
import * as webpack from "webpack";


/**
 * 编译文件
 * @param type
 */
export function getCompiler(type) {
  const config = getWebpackConfig(type);
  return webpack(config);
}
