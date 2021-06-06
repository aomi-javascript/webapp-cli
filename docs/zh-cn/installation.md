# 安装

可以使用下列任一命令安装这个新的包：
```shell
npm install -g @aomi/webapp-cli
# OR
yarn global add @aomi/webapp-cli
```

在现有的项目中直接使用:
1. 安装
```shell
npm install @aomi/webapp-cli
# OR
yarn add -D @aomi/webapp-cli
```

2. 配置启动脚本

`package.json`
```json
{
  "scripts": {
    // ...
    "start": "webapp serve",
    "bundle": "webapp bundle",
    // ...
  }
}
```
