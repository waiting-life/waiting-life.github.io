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
    "HTML",
    {
      type: 'category',
      label: 'JavaScript',
      link: {
        type: 'doc',
        id: 'javascript/js基础',
      },
      items: ['javascript/js基础'],
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
   "前端安全",
   "webpack",
   "leetcode",
   {
      type: 'category',
      label: '面试题总结',
      link: {
        type: 'doc',
        id: '面试题总结/牛客网面试题',
      },
      items: ['面试题总结/牛客网面试题'],
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