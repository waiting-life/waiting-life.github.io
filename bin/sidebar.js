const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const logger = require('tracer').colorConsole()

const docsRoot = path.join(__dirname, '..', 'docs')
const sidebarPath = path.join(
  __dirname,
  '..',
  'docs/.vuepress',
  'theme',
  'sidebar.ts'
)
const template = `
<% for(let variable of variables) { %>
const <%- variable.name %> = <%- JSON.stringify(variable.js); %>
<% } %>

export default {
  <% for (let variable of variables) { %>
    "/<%- variable.path %>/": <%- variable.name %>,
  <% } %>
}
`

main()

/**
 * 主体函数
 */
function main() {
  const variables = []

  const tocs = readTocs(docsRoot)
  tocs.forEach(({ toc, name }) => {
    const js = mapTocToSidebar(toc, `/${name}/`)
    if (!js.length) {
      return
    }

    variables.push({
      path: path.basename(toc),
      name: path.basename(toc).replace(/ /g, '_'),
      js,
    })
  })

  fs.writeFileSync(sidebarPath, ejs.render(template, { variables }))
}

/**
 * 读取指定目录的文件夹作为不同的目录
 * @param {String} root
 */
function readTocs(root) {
  const result = []
  const files = fs.readdirSync(root)
  files.forEach((name) => {
    const file = path.resolve(root, name)
    if (
      fs.statSync(file).isDirectory() &&
      name !== '.vuepress' &&
      name !== '.DS_Store'
    ) {
      result.push({ toc: file, name })
    }
  })
  return result
}

/**
 * 将对应目录映射为对应的边栏配置
 * @param {String} root
 * @param {String} prefix
 */
function mapTocToSidebar(root, prefix) {
  prefix = prefix || ''
  let sidebar = []
  const files = fs.readdirSync(root)

  files.forEach((filename) => {
    const file = path.resolve(root, filename)
    const stat = fs.statSync(file)

    if (filename === 'images' || filename === '.DS_Store') return
    if (stat.isDirectory()) {
      sidebar.push({
        text: filename,
        collapsible: false,
        children: mapTocToSidebar(file, prefix + filename + '/'),
      })
    } else {
      const metaData = filename.split('.')
      let [order, text, type] = metaData

      if (metaData.length === 3) {
        order = parseInt(order, 10)
        if (isNaN(order) || order < 0) return
      }

      if (sidebar[order]) {
        logger.warn(
          `For ${file}, its order has appeared in the same level directory. And it will be rewritten.`
        )
      }

      if (metaData.length === 3) {
        // sidebar[order] = { text, link: prefix + filename }
        sidebar[order] = prefix + filename
      } else {
        sidebar.unshift(prefix + filename)
      }
    }
  })

  sidebar = sidebar.filter((item) => item !== null && item !== undefined)
  return sidebar
}
