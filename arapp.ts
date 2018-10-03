#!/usr/bin/env node

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
import * as program from 'commander';
import * as path from 'path';

const pkg = require('./package.json');

program
  .version(pkg.version, '-v, --version')
  .description('A React Application Manager')
;

program
  .command('create <name>')
  .description('创建一个React Application')
  .action((name) => run('create', name))
;

program
  .command('serve')
  .description('启动一个开发服务器')
  .option('-p, --port', '监听端口')
  .action(() => {
    run('serve', {});
  })
;

program
  .command('bundle')
  .description('编译打包应用')
  .action(() => run('bundle', {}))
;

program
  .command('dll')
  .description('创建依赖库')
  .action(() => run('dll', {}))
;

program
  .parse(process.argv)
;

function run(cmd, options) {
  const cmdExecFile = path.join(__dirname, 'cmd', `${cmd}.js`);
  try {
    const handler = require(cmdExecFile);
    handler.execute(options);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

