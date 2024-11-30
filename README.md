# code blocks低代码开发平台

## 项目技术栈：

- 前端：vue3、vue2、nuxtjs、qiankun、vue-demi、antd、tailwindcss、vite、pnpm、ts
- 后端：nestjs、mysql
- 组件库文档搭建：vitepress

## 项目介绍

- 项目同时兼容vue2、vue3的组件库，使用pnpm作为依赖管理工具，采用monorepo架构进行开发，完成的低代码平台。
- 首页采用nuxtjs的ssr模式，实现服务端渲染，完成seo搜索。
- 低代码编辑器采用vue3进行开发，同时兼容pc和移动端。使用qiankun微前端框架，对项目进行组合。
- 后端采用nestjs进行开发，使用mysql作为数据库。
- 组件库文档采用vitepress进行搭建。

## 项目命令

- in: 安装所有目录的依赖
- clear: 清除所有目录的node_modules、dist、pnpm-lock.yaml
- dev: 启动 @code-blocks/editor 项目
- ui:dev: 启动 @code-blocks/ui 开发环境
- ui:build: 构建 @code-blocks/ui 生产环境
- ui:test: @code-blocks/ui 项目单元测试
- ui:coverage: @code-blocks/ui 项目单元测试覆盖率
- play:vue3: @code-blocks/playground 的 vue3 项目启动
- play:vue2: @code-blocks/playground 的 vue2 项目启动
