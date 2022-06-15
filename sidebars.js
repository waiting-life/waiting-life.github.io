/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    "HTML和CSS",
    {
      type: 'category',
      label: 'JavaScript',
      link: {
        type: 'doc',
        id: 'javascript/基础',
      },
      items: ['javascript/基础', 'javascript/数组', 'javascript/对象', 'javascript/函数', 'javascript/ES6', 'javascript/js基础'],
    },
    {
      type: 'category',
      label: 'React',
      link: {
        type: 'doc',
        id: 'react/ReactHooks',
      },
      items: ['react/ReactHooks', 'react/Redux'],
    },
    {
      type: 'category',
      label: 'TypeScript',
      link: {
        type: 'doc',
        id: 'typescript/基础',
      },
      items: ['typescript/基础', 'typescript/类型', 'typescript/对象类型', 'typescript/函数', 'typescript/类型操作', 'typescript/类型守卫', 'typescript/类型断言', 'typescript/泛型', 'typescript/深入'],
    },
  "设计模式",
  "浏览器",
  {
      type: 'category',
      label: '计算机网络',
      link: {
        type: 'doc',
        id: '计算机网络/http',
      },
      items: ['计算机网络/http'],
    },
   "前端安全",
   "webpack",
   "Git",
   {
    type: 'category',
    label: '算法',
    link: {
      type: 'doc',
      id: '算法/基础练习',
    },
    items: ['算法/基础练习', '算法/排序算法', '算法/二叉树'],
  },
   {
      type: 'category',
      label: '面试题总结',
      link: {
        type: 'doc',
        id: '面试题总结/牛客网面试题',
      },
      items: ['面试题总结/牛客网面试题', '面试题总结/面试题'],
    },
   {
      type: 'category',
      label: '面试题',
      link: {
        type: 'doc',
        id: '面试题/HTML和CSS',
      },
      items: ['面试题/HTML和CSS', '面试题/js', '面试题/react','面试题/ts', '面试题/浏览器计算机网络相关','面试题/前端安全','面试题/webpack','面试题/算法'],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;