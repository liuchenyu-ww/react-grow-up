# react-sail

`react`的种子工程, 采用`typescript`编写。基于[create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)生成的应用而深度定制。

## 诞生记
### 安装依赖
```bash
create-react-app react-sail --scripts-version=react-scripts-ts
cd react-sail
# 安装依赖
npm i react-router-dom react-loadable antd axios echarts mobx mobx-react lodash enquire-js -S
npm i @types/react-router-dom @types/react-loadable @types/echarts @types/lodash less-vars-to-js less less-loader cross-env ts-import-plugin -D
```

### 配置
+ 修改/设置`package.json`的scripts、proxy等
+ 设置`config-overrides.js`(配置多页、css module、antd按需加载及自定义主题)
+ 设置`tsconfig.json`(在文件的 compilerOptions 中配置 "experimentalDecorators": true 和 "noUnusedParameters": true)
+ 配置`tslint.json`(修改rules)
+ 添加`typing.d.ts`

## 特性
+ antd作为UI库，并配置按需加载、自定义主题等
+ mobx作为状态管理工具，store按功能组织
+ react-loadable实现组件级别(包含路由)的按需加载
+ axios并进行封装用于前后端数据交互
+ 支持less module(文件名称限定为 [name].module.less)
+ 支持多页
+ 权限控制与路由守卫
+ ...

## 风格
如前所述，react-sail支持多页配置。目前内置的多页分别为多套风格的布局：默认风格采用antd的light主题、顶部导航布局；charon(冥卫一)风格采用antd的dark主题、侧边导航布局。

## 主题设置
[themes]('./themes')目录下配置主题，其中：
+ antd-theme -- antd自定义主题设置
+ sail-theme -- 非UI库自定义主题设置(开发中...)

## 计划
+ 响应式布局
+ PWA
+ 在线主题切换
+ 支持服务端渲染
+ ...