import sidebar from './sidebar'

const nav = [
  {
    text: '前端基础',
    link: '/front_basic/',
    // children: [
    //   { text: 'Es6', link: '/front_basic/es6学习笔记.html' },
    //   { text: 'Html', link: '/front_basic/html学习.html' },
    //   { text: 'Jsx', link: '/front_basic/jsx学习.html' },
    // ],
  },
]

export default {
  base: '/',
  logo: '/favicon.ico', //网页顶端导航栏左上角的图标
  // docsRepo: 'https://code.betterwood.com/web/bdw-docs',
  docsBranch: 'docs',
  docsDir: 'docs',
  editLink: true,
  // editLinkText: '在 GitLab 上编辑此页',
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
    // {
    //   text: 'GitLab',
    //   link: 'https://code.betterwood.com/web/bdw-docs.git',
    // },
  ],
}
