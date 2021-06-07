# `webapp.config.js`

`webapp.config.js`是一个可选配置,如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 `@aomi/webapp-cli` 自动加载。

这个文件应该导出一个包含了选项的对象：

```
// webapp.config.js

module.exports = {
  // 选项...
}
```

### `mulitApp`

* Type: `boolean`
* Default: `false`

是否是多入口项目。默认为`false`，单入口项目.

#### 单入口项目

当为单入口项目时`webapp-cli`自动读取`src/index.web.tsx`作为`webpack`的`entry`配置项.
读取`src/index.html.js`作为`HtmlWebpackPlugin`的`template`配置.

项目结构如下:
```
src
  index.web.tsx
  index.html.js
```

#### 多入口项目

当为多入口项目时`webapp-cli`自动读取`src/app/xxx/index.web.tsx`作为`webpack`的`entry`配置项.
读取`src/app/xxx/index.html.js`作为`HtmlWebpackPlugin`的`template`配置.

项目结构如下:
```
src
  app
    foo1            # 访问路径: http://localhost:3000/foo1.html
      index.web.tsx
      index.html.js
    foo2            # 访问路径: http://localhost:3000/foo2.html
      index.web.tsx
      index.html.js
    foo3            # 访问路径: http://localhost:3000/foo3.html
      index.web.tsx
      index.html.js

```

### devServer

* Type: `Object`

所有 [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) 的选项都支持。

### devServer.api

* Type: `string`
* Default: `http://localhost:8080`

一个指向开发环境 API 服务器的字符串.

如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。 `devServer.api`配置默认的API服务器地址.

```javascript
// webapp.config.js
module.exports = {
  devServer: {
    api: 'http://localhost:8080'
  }
}
```

最终生产的`webpack-dev-server`的`proxy`配置如下:
```javascript
const devServerConfig = {
  proxy: {
    '/api/*': {
      target: api || 'http://localhost:8080',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  }
}
```

### devServer.proxy

* Type: `Object`
* Default: 
```javascript
// api 从 webapp.config.js 中的 devServer.api获取
const api = webappConfig.devServer.api;
const proxyConfig = {
  proxy: {
    '/api/*': {
      target: api || 'http://localhost:8080',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  }
}
```
如果默认的`proxy`配置不满足需求,可以通过`webapp.config.js`中的`devServer.proxy`选项来配置.
完整的选项可以查阅 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#proxycontext-config)。

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: '<url>',
        pathRewrite: { '^/api': '' },
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
```
