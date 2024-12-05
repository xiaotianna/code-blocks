### 📦 项目介绍

`开源`

一款低代码开发平台（LCDP）：开发者不需要传统的手写代码的方式进行编程，采用图形化拖拽的方式，配置参数完成开发工作。低代码核心：降低重复劳动（营销活动、中后台系统）。组成：组件区、编辑区/预览区、属性区。通过拖拽组件生成JSON，通过JSON渲染出页面（采用JSON Schema描述页面）。

!!! question 项目开发文档📖、仓库📦

飞书：[https://ucnm4m61b356.feishu.cn/wiki/HndVwx1gYi2mG4kHhkBcMRHUnkp](https://ucnm4m61b356.feishu.cn/wiki/HndVwx1gYi2mG4kHhkBcMRHUnkp)（讲述了项目从0到1的快速开发流程）

gitee：[https://gitee.com/wifi-skew-f/code-blocks](https://gitee.com/wifi-skew-f/code-blocks)

!!!

### 🚃 项目技术栈

- 前端：`vue3`、`vuedraggable`、`ts`、`vue-demi`、`element-plus`、`tailwindcss`、`vite`、`pnpm`、`JSON Schema`、`vitest`

- 后端：`nestjs`、`typeorm` + `mysql` + `jwt`

### 🏅 项目架构

使用pnpm构建`monorepo`架构，管理多个项目，在`code-blocks-editor`中，使用`block`物料构建组件库，进行动态渲染。基于`RBAC`角色权限控制，生成了动态路由菜单，对用户权限颗粒度更细的管理。

### ✨ 项目亮点

1. 使用`pnpm`完成`monorepo`环境搭建，采用`block`物料架构，将低代码的所有物料组件拆分成一个物料组件库，满足bem命名规范；
2. 完成物料组件库的开发搭建，通过npm安装使用，物料组件使用`vue-demi`和`vite`自定义打包，**同时兼容vue2和vue3**；
3. 使用`@sinclair/typebox`库对json schema进行配置，使用`ajv`对json schema参数进行自定义校验，并与element-plus表单校验进行集成；
4. 使用`vitest`对物料组件库组件进行单元测试，**测试覆盖率高达95%**；
5. 基于`RBAC`角色权限控制，实现对路由进行动态加载，基于权限封装了自定义指令，实现了颗粒度更细的按钮权限控制。
6. 使用`github` + `vercel`，实现`CICD`持续集成，自动部署

### 🔥 关于我

**wifi歪f**一个前端开发，喜欢研究前端技术。

!!! question 我的技术栈：

**前端：**`vue2`、`vue3`、`react`、`umijs`、`nuxt3`、`tailwindcss`、`ts`、`uniapp`、`微信小程序`、`taro`、`electron`

**工程化：**`webpack`、`vite`

**后端：**`nodejs`、`express`、`koa`、`eggjs`、`nestjs`、`mysql`、`mongodb`

!!!

- CSDN：[https://blog.csdn.net/m0_65519288?type=blog](https://blog.csdn.net/m0_65519288?type=blog)

- gitee：[https://gitee.com/wifi-skew-f](https://gitee.com/wifi-skew-f)

- b站：[https://space.bilibili.com/1990957072](https://space.bilibili.com/1990957072)
