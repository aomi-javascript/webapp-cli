import * as fs from 'fs-extra';
import * as path from 'path';
import * as spawn from 'cross-spawn';

const dependencies = [];

const devDependencies = [
  '@aomi/webapp-cli'
];

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
export function execute(appName: string[]) {
  if (!appName) {
    console.error(`
请指定App Name
webapp create myApp
        `);
    process.exit(1);
  }
  console.log(`app name ${appName}`);

  const appHome = `${process.cwd()}/${appName}`;

  if (fs.pathExistsSync(appHome)) {
    console.error(`${appHome} exists`);
    process.exit(1);
  }
  try {
    fs.mkdirsSync(appHome);
  } catch (e) {
    console.error(`创建应用目录失败: ${e.message}`);
  }

  const templateHome = path.resolve(__dirname, '..', 'index.ts');
  fs.copySync(templateHome, appHome);
  Promise.race([installDependencies(appHome), installDevDependencies(appHome)])
    .then(() => console.log('install success.'))
    .catch(err => console.error(err));
}


function installDependencies(root) {
  return new Promise<void>((resolve, reject) => {
    let command = 'yarn';
    let args = ['add', ...dependencies];
    args.push('--cwd', root);
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }
      resolve();
    });
  });
}

function installDevDependencies(root) {
  let command = 'yarn';
  let args = ['add', '--dev', ...devDependencies];
  args.push('--cwd', root);
  const child = spawn(command, args, { stdio: 'inherit' });
  child.on('close', code => {
    if (code !== 0) {
      console.error(`exec ${command} ${args.join(' ')} error`);
      process.exit(1);
    }
  });
}
