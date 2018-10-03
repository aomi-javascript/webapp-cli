#!/usr/bin/env node

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
import * as program from 'commander';
import * as path from 'path';

const pkg = require('./package.json');

let cmd = '', options = '';

program
  .version(pkg.version, '-v, --version')
  .command('create <name>', '创建一个 React App.')
  .command('start', '启用应用')
  .command('bundle', '打包应用')
  .action((c, o) => {
    cmd = c;
    options = o;
  })
  .parse(process.argv)
;

const cmdExecFile = path.join(__dirname, 'cmd', `${cmd}.js`);
try {
  const handler = require(cmdExecFile);
  handler.execute(options);
} catch (e) {
  console.error(e);
  process.exit(1);
}
