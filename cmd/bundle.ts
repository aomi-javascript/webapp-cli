import prod from '../config/webpack.prod';
import {getCompiler} from "../utils/compiler";

/**
 * 执行打包任务
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/3
 */
export function execute() {
  const compiler = getCompiler('prod');
  compiler.run((err: any, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    let method = 'log';
    if (stats.hasErrors()) {
      method = 'error';
    } else if (stats.hasWarnings()) {
      method = 'warn';
    }
    console[method](stats.toString({
      chunks: false,  // Makes the build much quieter
      colors: true    // Shows colors in the console
    }));
    compiler.close((e, r) => {
      e && console.log('关闭compiler失败', e);
    });
  });
}
