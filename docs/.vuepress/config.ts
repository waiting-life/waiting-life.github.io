const path = require('path')

import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions, BundlerConfig } from 'vuepress'
import themeConf from './theme/themeConf'

export default defineUserConfig<DefaultThemeOptions, BundlerConfig>({
  base: '/',
  lang: 'zh-CN',
  title: '怂怂', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '前端学习', // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    [
      'link',
      { rel: 'icon', href: '/favicon.ico' }, //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],

  // markdown
  markdown: {
    // markdown-it-toc 的选项
    toc: {
      level: [1, 2, 3],
    },
    code: {
      lineNumbers: true,
    },
  },

  // theme
  theme: path.resolve(__dirname, './theme'),
  themeConfig: themeConf,

  // plugins
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        // 排除首页
        isSearchable: (page) => page.path !== '/',
      },
    ],
  ],
})
