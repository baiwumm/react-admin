<p align="center"><img width="120" src="./Xmw_web/public/logo.svg" alt="React Admin"></p>
<h1 align="center">React Admin</h1>
<p align="center">基于 React + Umijs + Nest 全栈开发的企业级中后台管理系统</p>

<p align="center">
  <a href="https://github.com/baiwumm/react-admin/stargazers">
    <img src="https://img.shields.io/github/stars/baiwumm/react-admin" alt="Stars Badge"/>
  </a>
  <a href="https://github.com/baiwumm/react-admin/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/baiwumm/react-admin" alt="License Badge"/>
  </a>
  <img src="https://img.shields.io/badge/React-18.x-blue?logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Ant%20Design-5.x-blue?logo=ant-design" alt="Ant Design"/>
  <img src="https://img.shields.io/badge/Umi-4.x-blue?logo=umijs" alt="Umi"/>
  <img src="https://img.shields.io/badge/Nest.js-10.x-red?logo=nestjs" alt="Nest.js"/>
  <img src="https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql" alt="MySQL"/>
</p>

## 📖 项目简介

React Admin 是一个现代化的企业级中后台管理系统框架，采用前后端分离架构，基于 React 18、Ant Design 5.x、TypeScript 5.x、Umi 4.x 和 Nest.js 10.x 等最新技术栈开发。本项目致力于为开发者提供一套完整、高效、可扩展的中后台解决方案，帮助企业快速构建功能丰富、交互友好的管理系统。

### 🔨 技术架构

- 🚀 **前端技术栈**： [React 18](https://react.dev/)、[Ant Design 5.x](https://ant.design/)、[Umi 4.x](https://umijs.org/)、[TypeScript 5.x](https://github.com/microsoft/TypeScript)、[Redux](https://redux.js.org/)

- 🛠️ **后端技术栈**： [Nest.js 10.x](https://docs.nestjs.cn/)、[Sequelize 6.x](https://github.com/sequelize/sequelize/)、[Redis](https://github.com/redis/redis/)、[MySQL 8.x](https://www.mysql.com/)

### 🔗 项目资源

- 🔍 **在线预览**： [https://react.baiwumm.com/](https://react.baiwumm.com/)

- 🔑 **体验账号**：用户名 `admin`，密码 `abc123456`

- 📚 **API 文档**：[Swagger 接口文档](https://react.baiwumm.com/docs)

- ⭐ **支持项目**：如果这个项目对您有帮助，请给个 Star，是对作者最大的鼓励！

## ✨ 系统核心特性

1. 📚 **动态国际化**：内置完善的国际化解决方案，支持多语言动态切换，满足全球化业务需求
2. 📝 **完整审计日志**：自动记录用户的 CRUD 操作，提供全面的系统行为追踪和审计能力
3. 🧩 **动态路由菜单**：根据用户角色权限动态生成路由和菜单，实现真正的按需加载
4. 📢 **实时消息推送**：基于 SSE (Server-Sent Events) 技术实现服务器到客户端的实时消息推送
5. 🎨 **主题定制**：支持多种预设主题，并可根据企业VI进行个性化定制
6. 🛡️ **TypeScript支持**：全面使用 TypeScript 开发，提供完整的类型定义，增强代码健壮性
7. 🧪 **组件封装**：包含大量实用的业务组件和功能展示，可直接应用于实际项目

## 🔧 环境要求与依赖

> 推荐使用 [pnpm](https://github.com/pnpm/pnpm/) 作为包管理工具，显著提升依赖安装速度

### 💻 开发环境

- [Node.js](https://nodejs.org/) (版本要求 16.x 以上，推荐 18.x 及以上)
- [pnpm](https://github.com/pnpm/pnpm/) (推荐 8.x 及以上版本)
- [MySQL](https://www.mysql.com/) (版本 8.x)
- [Redis](https://redis.io/) (可选，用于缓存和会话管理)

### 📚 技术依赖

- 前端框架：[Umi](https://umijs.org/) (4.x)
- UI组件库：[Ant Design](https://ant.design/) (5.x)
- 后端框架：[Nest.js](https://nestjs.com/) (10.x)
- ORM框架：[Sequelize](https://sequelize.org/) (6.x)

## 🚀 项目运行指南

### 1️⃣ 数据库配置

安装 [MySQL](https://www.mysql.com/) 并导入 `/mysql/xmw_admin.sql` 文件，然后修改 `/Xmw_server/.development.env` 文件中的数据库配置：

```txt
# ------- MySQL 配置 ---------------------
# 数据库主机
DATABASE_HOST = 127.0.0.1
# 端口号
DATABASE_PORT = 3306
# 用户名
DATABASE_NAME = root
# 密码
DATABASE_PWD = 123456
# 数据库名
DATABASE_LIB = react-admin
```

### 2️⃣ 获取项目代码

```bash
git clone https://github.com/baiwumm/react-admin.git
cd react-admin
```

### 3️⃣ 安装依赖

```bash
npm install -g pnpm
pnpm install
```

### 4️⃣ 开发模式运行

```bash
# 前端开发模式启动
cd Xmw_web
pnpm dev

# 后端开发模式启动
cd Xmw_server
pnpm start:dev
```

### 5️⃣ 项目构建

```bash
pnpm build
```

## 🧭 新增路由菜单指南

1. 在 `Xmw_web/src/pages` 目录下新建 `文件夹/index.tsx` 文件
2. 在 `Xmw_web/config/router` 文件中添加路由配置
3. 在 `Xmw_web/src/utils/enums/index` 文件中添加 `ROUTES` 枚举映射
4. 在 `Xmw_web/src/utils/const/index` 文件中添加 `MenuRemixIconMap` 图标映射
5. 在菜单 `系统管理-国际化-menu` 中添加路由配置
6. 在菜单 `系统管理-菜单管理` 中按照规则添加菜单
7. 在菜单 `系统管理-角色管理` 中编辑状态中勾选相应的菜单，保存刷新页面

> 路由配置参考：[Umi 路由文档](https://umijs.org/docs/guides/routes)

## 📋 功能模块概览

```
- 登录 / 注销

- 指示面板
  - 工作台
  - 环境依赖

- 智能行政
  - 活动公告
  - 组织管理
  - 岗位管理
  - 组织架构

- 个人中心
  - 个人信息
  - 个人设置

- 功能页
  - 验证码
  - 甘特图
  - 图片预览
  - 懒加载
  - 图片取色盘
  - 系统级取色器
  - 流程图
  - Swiper
  - 文件预览
  - 图表

- 技术文档
  - React文档
  - Nest文档
  - And-design文档
  - Umi文档

- 系统设置
  - 用户管理
  - 菜单管理
  - 角色管理
  - 国际化
  - 操作日志
```

## 🖼️ 系统截图展示

| ![](./demo/1.png) | ![](./demo/2.png) |
| ----------------- | ----------------- |
| ![](./demo/3.png) | ![](./demo/4.png) |
| ![](./demo/5.png) | ![](./demo/6.png) |
| ![](./demo/7.png) | ![](./demo/8.png) |
| ![](./demo/9.png) | ![](./demo/10.png) |
| ![](./demo/11.png) | ![](./demo/12.png) |
| ![](./demo/13.png) | ![](./demo/14.png) |

## 📝 项目说明与贡献

### 📌 关于本项目

React Admin 是一个开源的企业级中后台管理系统框架，旨在为开发者提供一套完整、高效的前后端解决方案。本项目集成了当前主流的前端技术栈和最佳实践，可作为企业级项目的基础框架或学习参考。

### 🤝 贡献指南

1. 本项目欢迎社区贡献，如发现问题或有新功能建议，请提交 [Issues](https://github.com/baiwumm/react-admin/issues)
2. 如果您希望参与代码贡献，请提交 [Pull Request](https://github.com/baiwumm/react-admin/pulls)
3. 代码贡献请遵循项目既定的代码风格和提交规范

### 📄 许可证

本项目采用 [MIT 许可证](./LICENSE)。这意味着您可以自由地使用、修改和分发本项目，无论是个人还是商业用途，但需要保留原始许可证和版权信息。

### ⚠️ 免责声明

作者不对因使用本项目而产生的任何直接或间接的问题负责。在将本项目用于生产环境之前，请确保您已经充分测试并理解其功能和限制。

## 📈 Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=baiwumm/react-admin&type=Date)](https://star-history.com/#baiwumm/react-admin&Date)