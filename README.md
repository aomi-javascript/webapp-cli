# webapp-cli

一个Web App应用脚手架

### 自动根据环境的不同读取用户项目目录下的文件
```
webpack.common.js
webpack.dev.js
webpack.prod.js
```

### `webapp.config.js`

| 参数	 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| mulitApp | 支持多入口App.读取`src/app`目录下的文件夹,每个文件夹作为一个入口应用; 默认读取`index.web.tsx`文件和`index.html.js`文件作为入口文件 |boolean | false|
| devServer | 开发环境`server`配置 | DevServer | |

```javascript
module.exports = {
  
  devServer: {
    api: 'http://localhost:8080',
    port: 3000
  }
}
```
