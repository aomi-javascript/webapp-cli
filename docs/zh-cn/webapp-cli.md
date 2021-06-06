# Webapp CLI

Web App 开发标准工具


### `webapp.config.js` 

`webapp.config.js`是一个可选配置,如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 `@aomi/webapp-cli` 自动加载。

这个文件应该导出一个包含了选项的对象：

```
// webapp.config.js

module.exports = {
  // 选项...
}
```