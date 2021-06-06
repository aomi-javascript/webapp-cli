# `webapp.config.js`

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
