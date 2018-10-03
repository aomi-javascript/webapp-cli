import * as fs from 'fs-extra';
import * as path from 'path';
import * as spawn from 'cross-spawn';

const dependencies = [
  '@babel/polyfill',
  '@sitb/svg-icon',
  '@sitb/wbs',
  'connected-react-router',
  'es6-promise',
  'react',
  'react-dom',
  'react-redux',
  'react-router-dom',
  'redux',
  'redux-observable',
  'rxjs',
  'veigar',
  'whatwg-fetch'
];

const devDependencies = [
  '@sitb/arapp-cli',
  'add-asset-html-webpack-plugin',
  'awesome-typescript-loader',
  'clean-webpack-plugin',
  'html-webpack-plugin',
  'mini-css-extract-plugin'
];

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
export function execute(appName) {
  if (!appName) {
    console.error(`
请指定App Name
arapp create myApp
        `);
    process.exit(1);
  }
  console.log(`app name ${appName}`);

  const appHome = `${process.cwd()}/${appName}`;

  console.log(appHome);

  if (fs.pathExistsSync(appHome)) {
    console.error(`${appHome} exists`);
    process.exit(1);
  }
  try {
    fs.mkdirsSync(appHome);
  } catch (e) {
    console.error(`创建应用目录失败: ${e.message}`);
  }

  const templateHome = path.resolve(__dirname, '..', 'template');
  fs.copySync(templateHome, appHome);
  Promise.race([installDependencies(appHome), installDevDependencies(appHome)])
    .then(() => console.log('install success.'))
    .catch(err => console.error(err));
}


function installDependencies(root) {
  return new Promise((resolve, reject) => {
    let command = 'yarn';
    let args = ['add', ...dependencies];
    args.push('--cwd', root);
    const child = spawn(command, args, {stdio: 'inherit'});
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
  const child = spawn(command, args, {stdio: 'inherit'});
  child.on('close', code => {
    if (code !== 0) {
      console.error(`exec ${command} ${args.join(' ')} error`);
      process.exit(1);
    }
  });
}
