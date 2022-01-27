import sidebar from './sidebar'

const nav = [
  {
    text: '前端标准化',
    link: '/stardard/',
  },
  {
    text: '框架',
    children: [
      { text: 'Vue', link: '/framework/vue/1.vue3规范.html' },
      { text: 'React', link: '/framework/react/1.setState分析.html' },
    ],
  },
  {
    text: '大前端',
    children: [
      { text: 'html', link: '/html/1.script标签中defer与async异同.html' },
      { text: 'CSS', link: '/css/1.清除浮动.html' },
      {
        text: 'Javascript',
        children: [
          {
            text: 'JavaScript深入系列',
            link: '/front_basic/深入系列/1.原型和原型链.html',
          },
          {
            text: 'JavaScript专题系列',
            link: '/front_basic/专题系列/1.函数防抖.html',
          },
          { text: 'ES6', link: '/front_advance/es6/1.let和const.html' },
          {
            text: 'Typescript',
            link: '/front_advance/typescript/1.typescript高级用法.html',
          },
        ],
      },
    ],
  },
  { text: '其他', link: '/other/1.npm简述.html' },
]

export default {
  base: '/',
  logo: '/favicon.ico', //网页顶端导航栏左上角的图标
  docsRepo: 'https://code.betterwood.com/web/bdw-docs',
  docsBranch: 'develop',
  docsDir: 'docs',
  editLink: true,
  editLinkText: '在 GitLab 上编辑此页',
  editLinkPattern: ':repo/-/edit/:branch/:path',

  // 侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
  sidebar: {
    '/': ['README.md'],
    ...sidebar,
  },
  sidebarDepth: 2,

  // 顶部导航栏
  navbar: [
    ...nav,
    //格式三：跳转至外部网页，需http/https前缀
    {
      text: 'GitLab',
      link: 'https://code.betterwood.com/web/bdw-docs.git',
    },
  ],
}
