import * as path from 'path';

/**
 * 模板信息配置文件
 */

export interface Index {
  /**
   * 模板名称
   */
  name: string
  /**
   * 模板描述
   */
  describe?: string

  /**
   * 模板路径
   */
  path: string

  /**
   * 依赖信息
   */
  dependencies?: string[]

  /**
   * 开发依赖
   */
  devDependencies?: string[]
}


export default [{
  name: 'react',
  describe: 'Default. React + Typescript (Production Typescript -> ESNEXT -> Babel -> js)',
  path: path.join(__dirname, 'index.ts', `default`)
}, {
  name: 'fourr',
  describe: 'React + React Router + Redux + Rxjs + Typescript (Production Typescript -> ESNEXT -> Babel -> js)',
  path: path.join(__dirname, 'index.ts', 'four_r'),
  dependencies: [
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
  ]
}, {
  name: 'rrkrm',
  describe: 'React + React Keeper + React Mobx + Typescript (Production Typescript -> ESNEXT -> Babel -> js)',
  path: path.join(__dirname, 'index.ts', `rrkrm`),
  dependencies: [
    'react',
    'react-dom',
    'react-keeper',
    'veigar',
    'whatwg-fetch'
  ]
}];
