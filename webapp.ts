#!/usr/bin/env node

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
import * as program from 'commander';
import * as path from 'path';
import templates from './template';

const pkg = require('./package.json');

program
  .version(pkg.version, '-v, --version')
  .description('A React Application Manager')
;

program
  .command('create <name>')
  .description(`创建一个Web app.

  模板列表:
    ${templates.map(({name, describe}) => `${name} - ${describe}`).join('\n    ')}

  样例:
    arapp create -t react foo
`)
  .option('-t, --template', '模板名称', 'react')
  .action((command, options) => {
    console.log(command, options.template)
  })
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
  .action(() => {
    process.env.NODE_ENV = 'production';
    run('dll', {}).then(() => {
      run('bundle', {});
    });
  })
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
    return handler.execute(options);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

