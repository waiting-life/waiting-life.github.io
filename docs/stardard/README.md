---
title: '前端规范总览'
date: 2022-01-10
tag:
  - 前端标准化
categories:
  - 前端标准化
---

## 开发工具

- vscode

## 开发语言

- typescript

  官方文档：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)

- css

  - less/sass

    **现状**
    管理后台：less
    C 端 H5：sass

  - postcss

## 知识库

- 飞书- 云文档

  位置：飞书> 共享空间> 产品研发中心>

## 格式化代码

统一采用公司标准。

- prettier

  - 项目配置

- IDE vscode 设置
  - 安装 Prettier - Code formatter 插件
  - 工作区配置：.vscode/settings.json
- Git hook 配置

文档: [Prettier 规范和配置](./Prettier规范和配置.html)

## 代码规范 & Linters

eslint & stylelint

- 执行标准：采用各框架推荐配置
- vue 框架：[Lint 规范和配置](./Lint规范和配置.html)

## Git Commit 规范

- [Git commit message 规范](./Git-commit规范.html)

## Git 提交校验

- git hooks

  linters & prettier & git commit 需要配置对应的 git hook

## 代码分支管理规范

- [GitFlow 规范](./GitFlow规范.html)

## CI/CD

#### 1. 环境隔离

生产环境必须自动化、禁止手动直接操作

- 测试环境
- 预发布环境（uat）
- 生产环境

#### 2. 部署

- Jenkins

  目前采用 Jenkins 统一部署

- [静态资源 CI/CD](./静态资源上传Ali-oss.html)

## 框架选型

现各项目采用如下方案，如需引入新方案，需技术组合议。

#### 1. 小程序

- uniapp

#### 2. 管理后台

- react

#### 3. C 端 H5

- vue3
