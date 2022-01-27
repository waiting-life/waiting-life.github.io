const path = require('path')
module.exports = {
  oss: {
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAI4G5UqEsV2KqxWkjfVWBv',
    accessKeySecret: 'HppzBvOh4N3tTG9xA5XN3TzJJKcr9F',
    bucket: 'bdw-docs',
  },
  task: [
    {
      source: path.join(__dirname, 'docs/.vuepress/dist'),
      publicPath: '/',
    },
  ],
}
