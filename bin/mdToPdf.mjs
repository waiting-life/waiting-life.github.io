import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import Promise from 'bluebird'
import { mdToPdf } from 'md-to-pdf'
import ora from 'ora'

process.setMaxListeners(100)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const tarDir = process.argv?.[2] || 'pdf'
const tarDirPath = path.join(process.cwd(), tarDir)

// 异步调度封装
class Scheduler {
  constructor(count) {
    this.count = count
    this.queue = []
    this.run = []
  }

  add(task) {
    this.queue.push(task)
    return this.schedule()
  }

  schedule() {
    if (this.run.length < this.count && this.queue.length) {
      const task = this.queue.shift()
      const promise = task().then(() => {
        this.run.splice(this.run.indexOf(promise), 1)
      })
      this.run.push(promise)
      return promise
    } else {
      return Promise.race(this.run).then(() => this.schedule())
    }
  }
}
const scheduler = new Scheduler(18)

const spinner = ora({
  discardStdin: false,
  text: '开始生成PDF文件',
  spinner: process.argv[2],
})

// 复制目录
async function copyDir() {
  const origin = path.join(__dirname, '../docs')
  try {
    await fs.copy(origin, tarDirPath)
    readdir(tarDirPath)
  } catch (error) {
    console.log(error)
  }
}

fs.stat(tarDirPath, async (err, stat) => {
  if (stat && stat.isDirectory()) {
    await fs.remove(tarDirPath)
    await copyDir()
  } else {
    await copyDir()
  }
})

// 递归处理文件目录
async function readdir(dir) {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    if (file === '.vuepress' || file === 'images') {
      await fs.remove(filePath)
    } else {
      const stat = await fs.stat(filePath)
      // 递归遍历文件
      if (stat.isDirectory()) {
        readdir(filePath)
      } else if (filePath.endsWith('.md')) {
        // 异步调度
        scheduler.add(async () => {
          spinner.start(`正在转化《${file}》文件`)
          const newFilePath = filePath.replace('.md', '.pdf')
          const pdf = await mdToPdf({ path: filePath })
          await fs.remove(filePath)
          spinner.succeed(`成功生成《${file.replace('.md', '.pdf')}》文件`)
          fs.outputFile(newFilePath, pdf.content)
        })
      }
    }
  }
}
