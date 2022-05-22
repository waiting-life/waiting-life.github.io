# webpack
## 代码分离
1. 概念

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

常用的代码分离方法有三种：

**入口起点**：使用 entry 配置手动地分离代码。
**防止重复**：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
**动态导入**：通过模块的内联函数调用来分离代码。


### 入口起点(entry point) 
**src**
我们在index.js和another-module.js中都引入了lodash模块，打包后生成的index.bundle.js和index.bundle.js中都引入了lodash模块，重复
```js
// index.js
import _ from 'lodash'
import './style.css'
// import Img from './xiaomonv.webp'
import test from './test'

function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')
  element.innerHTML = _.join(['hello', 'webpack'])
  btn.innerHTML = "click me console "
  element.classList.add('hello')
  btn.addEventListener('click', test)
  element.appendChild(btn)

  // const myImage = new Image()
  // myImage.src = Img 
  // element.appendChild(myImage)
  return element
}

document.body.appendChild(component())


// another-module.js
import _ from 'lodash';

console.log(_.join(['Another', 'module', 'loaded!'], ' '));
console.log('another-module.js')

// test.js
export default function test() {
  console.log('test', 'webpack-serve')
}
```
**webpack.config.js**
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports  =  {
  mode: 'development',
  entry: {
    index: './src/index.js',
    test: './src/test.js',
    another: './src/another-module.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
}
```

### 防止重复
1. 配置 dependOn option 选项，这样可以在多个 chunk 之间共享模块：

打包后：生成 shared.bundle.js，index.bundle.js 和 another.bundle.js 之外，还生成了一个 runtime.bundle.js 文件。
**webpack.config.js**
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 代码分离/防止重复
module.exports  =  {
  mode: 'development',
  // 配置 dependOn option 选项，这样可以在多个 chunk 之间共享模块：
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared'
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared'
    },
    test: './src/test.js',
    shared: 'lodash'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  // 如果我们要在一个 HTML 页面上使用多个入口时，还需设置 optimization.runtimeChunk: 'single'，否则还会遇到这里所述的麻烦。
  optimization: {
    runtimeChunk: 'single'
  }
}
```


2. SplitChunksPlugin插件
**webpack.config.js**
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//  SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 lodash 模块去除
module.exports  =  {
  mode: 'development',
  entry: {
    index: './src/index.js',
    test: './src/test.js',
    another: './src/another-module.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
```


### 动态导入
**index.js**
```js
function getComponent() {
  return import('lodash')
  .then(({default: _}) => {
      const element = document.createElement('div')
      element.innerHTML = _.join(['hello', 'webpack'], ' ')
      return element
  })
  .catch((error) => 'An error occurred while loading the component');
}

getComponent().then((component) => {
  document.body.appendChild(component);
});

async function getComponent() {
  const element = document.createElement('div')
  const  {default: _} = await import('lodash')
  element.innerHTML = _.join(['hello', 'webpack'], ' ')
  return element
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```

**webpack.config.js**
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports  =  {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test',
      template: path.join(__dirname, 'public/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource' // file-loader
        // type: 'asset/inline' // url-loader (dataUrl base64)
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.txt$/,
        type: 'asset/source' // raw-loader
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
}

```
## 缓存
我们使用 webpack 来打包我们的模块化后的应用程序，webpack 会生成一个可部署的 /dist 目录，然后把打包后的内容放置在此目录中。只要 /dist 目录中的内容部署到 server 上，client（通常是浏览器）就能够访问此 server 的网站及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为 缓存 的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。

### 步骤
1. 输出文件的文件名
   文件内容随着文件名的变化而变化
   filename: '[name].[contenthash].js',
2. 提取引导模板
```js
 optimization: {
     runtimeChunk: 'single',
   },
```
3. 缓存第三方库：将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中

在 optimization.splitChunks 添加如下 cacheGroups 参数

```js
   optimization: {
     runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',  // 打包后的名字
           chunks: 'all',
         },
       },
     },
    },
```

## 创建library
### 步骤
1. 通过output.library 配置项暴露从入口导出的内容。
**注意**：此时它只能通过被 script 标签引用而发挥作用，它不能运行在 CommonJS、AMD、Node.js 等环境中。
```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers'
  }
}
```

2. 更新 output.library 配置项，将其 type 设置为 'umd'

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: {
      name: 'webpackNumbers',
      type: 'umd' // 支持ommonJS、AMD 以及 script 标签使用
    }
  }
}
```
3. 使用 externals 配置,避免lodash也被打包到代码中
+ 执行 webpack，会发现创建了一个体积相当大的文件。查看这个文件，看到 lodash 也被打包到代码中。
+ 在这种场景中，我们更倾向于把 lodash 当作 peerDependency。
+ 也就是说，consumer(使用者) 应该已经安装过 lodash 。因此，你就可以放弃控制此外部 library ，而是将控制权让给使用 library 的 consumer(使用者)·
+ 这意味着你的 library 需要一个名为 lodash 的依赖，这个依赖在 consumer 环境中必须存在且可用。

**外部化lodash**
```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: {
      name: 'webpackNumbers',
      type: 'umd'
    }
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
}
```

**外部化的限制**
对于想要实现从一个依赖中调用多个文件的那些 library：
```js
import A from 'library/one';
import B from 'library/two';
```
无法通过在 externals 中指定整个 library 的方式，将它们从 bundle 中排除。而是需要逐个或者使用一个正则表达式，来排除它们。

```js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // 匹配以 "library/" 开始的所有依赖
    /^library\/.+$/,
  ],
};
```
4. 最终步骤

遵循 [生产环境](https://webpack.docschina.org/guides/production/) 指南中提到的步骤，来优化生产环境下的输出结果。那么，我们还需要将生成 bundle 的文件路径，添加到 package.json 中的 main 字段中。
```json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

或者，按照这个 [指南](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)，将其添加为标准模块：
```json
{
  ...
  "module": "src/index.js",
  ...
}
```
## 环境变量
### 步骤
1. module.exports 指向配置对象。要使用 env 变量，你必须将 module.exports 转换成一个函数：
**webpack.config.js**
```js
const path = require('path');

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
```

### 配置
1. 公共配置: webpack.config.common.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports =  {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      assetModuleFilename: 'images/[contenthash][ext]',  // generator优先级高于assetModuleFilename
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public/index.html"),
        // filename: 'app.html',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        // 自定义打包后的文件路径和名称
        filename: 'styles/[contenthash].css'
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups:{
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // js包括我们自己的js和node_modules里面的js， node_modules里面的js我们不需要用babel编译，所以排除
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.(css|less)$/,
          // style-loader生成到html的style标签里面
          // use: ['style-loader', 'css-loader']
          // 单独抽出css文件,此时打包后生成的html通过link引入css
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.(jpg|jpeg|webp|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[contenthash][ext]'
          }
        },
        {
          test: /\.svg$/,
          type: 'asset/inline'
        },
        {
          test: /\.txt$/,
          type: 'asset/source'
        },
        {
          test: /\.png$/,
          // 通用数据类型
          type: 'asset',
          parser: {
            dataUrlCondition: {
              // 默认 4*1024
              maxSize: 4 * 1024
            }
          }
        }
      ]
    },
  }

```
2. 开发环境: webpcak.config.dev.js

```js
// 开发环境没必要用contenthash,publicPath,开发环境没必要压缩
module.exports = {
    mode: 'development',
    output: {
      filename: 'js/[name].[bundle].js' ,
    },
    // 开发环境需要调试代码
    devtool: 'inline-source-map',
    devServer: {
      static: '../dist',
      hot: true,
      liveReload: true,
      // compress: true,
      port: 3000,
      // header: {

      // },
      // 设置代理
      proxy: {
        '/api' : 'http://localhost:9000'
      },
      // https: true
      // http2: true, // http2自带https，
      // host: '0.0.0.0'
    },
    
  }
```
3. 生产环境: webpack.config.prod.js

```js
// 这个插件不是在plugins里面写，而是写在优化相关的optimization中
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin  = require('terser-webpack-plugin')

// 生产环境不需要devSever
module.exports = {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js' ,
    publicpath: 'http://localhost:8080/',
  },
  optimization: {
    // 这个时候需要把mode改为production
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ],
  },
  // 去掉生产环境提示
  performance: {
    hints: false,
  },
}
```

4. 使用webpack-merge合并: webpack.config.js

```js
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.config.common')
const devConfig = require('./webpack.config.dev')
const prodConfig = require('./webpack.config.prod')

module.exports = (env) => {
  switch(true) {
    case env.development:
      return merge(commonConfig, devConfig)
    case env.production:
      return merge(commonConfig, prodConfig)
    default: 
      return new Error('not match')
  }
}
```
## 构建性能

## 模块热替换
模块热替换(hot module replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新所有类型的模块，而无需完全刷新。本页面重点介绍其实现，而 概念 页面提供了更多关于它的工作原理以及为什么它有用的细节。

## npm脚本
```package.json
"start": "webpack serve -c ./config/webpack.config.dev.js"
"build":"webpack serve -c ./config/webpack.config.prod.js"
```

## 代码
1. 基础配置代码案例

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 这个插件不是在plugins里面写，而是写在优化相关的optimization中
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin  = require('terser-webpack-plugin')

module.exports = (env) => {
  return  {
    mode: env.production ? 'production' : 'development',
    entry: {
      // 分离代码

      // 1. 多个entry
      // 当两个入口文件引入了相同的库的情况下，会造成打包后的代码重复
      index: './src/index.js',
      another: './src/another-module.js'

      // 2. 抽出公共库
      // index: {
      //   import: './src/index.js',
      //   dependOn: 'shared'
      // }, 
      // another: {
      //   import: './src/another-module.js',
      //   dependOn: 'shared'
      // },
      // // 将依赖的公共库取名为shared
      // shared: 'lodash'

      // 3. 设置 splitChunks: { chunks: 'all' }
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].[contenthash].js' ,
      assetModuleFilename: 'images/[contenthash][ext]',  // generator优先级高于assetModuleFilename
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "./public/index.html"),
        // filename: 'app.html',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        // 自定义打包后的文件路径和名称
        filename: 'styles/[contenthash].css'
      }),
    ],
    optimization: {
      // 这个时候需要把mode改为production
      minimizer: [
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin()
      ],
      splitChunks: {
        // chunks: 'all'
        cacheGroups:{
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // js包括我们自己的js和node_modules里面的js， node_modules里面的js我们不需要用babel编译，所以排除
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.(css|less)$/,
          // style-loader生成到html的style标签里面
          // use: ['style-loader', 'css-loader']
          // 单独抽出css文件,此时打包后生成的html通过link引入css
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.(jpg|jpeg|webp|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[contenthash][ext]'
          }
        },
        {
          test: /\.svg$/,
          type: 'asset/inline'
        },
        {
          test: /\.txt$/,
          type: 'asset/source'
        },
        {
          test: /\.png$/,
          // 通用数据类型
          type: 'asset',
          parser: {
            dataUrlCondition: {
              // 默认 4*1024
              maxSize: 4 * 1024
            }
          }
        }
      ]
    },
   
    performance: {
      hints: false,
    },
    devServer: {
      static: './dist',
      hot: true,
      liveReload: true,
      // compress: true,
      port: 3000,
      // header: {

      // },
      // 设置代理
      proxy: {
        '/api' : 'http://localhost:9000'
      },
      // https: true
      // http2: true, // http2自带https，
      // host: '0.0.0.0'
    },
    devtool: 'inline-source-map'
  }
}
```

## 扩展
### babel-loader
### ts-loader
### postcss
#### 安装
postcss-loader
autoprefixer

#### 配置
1. webpack.config.js
```js
{
 test: /\.(css|less)$/,
 // style-loader生成到html的style标签里面
 // use: ['style-loader', 'css-loader']
 // 单独抽出css文件,此时打包后生成的html通过link引入css
 use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
},
```
2. postcss.config.js
```js
module.exports = {
  plugins: [require('autoprefixer')]
}
```
3. package.json
```json
 "browserslist": [
    "> 1%",
    "last 2 version"
  ]
```
### 多页面应用
webpack.config.js
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  // entry: ['./src/app.js', './src/app2.js', 'lodash'],

  // 把第三方库单独分离出来
  // entry: {
  //   main: {
  //     import: ['./src/app.js', './src/app2.js'],
  //     dependOn: 'lodash'
  //   },
  //   lodash: 'lodash'
  // },

  // app3也用到了lodash， 并且app3单独打包
  entry: {
    main: {
      import: ['./src/app.js', './src/app2.js'],
      dependOn: 'lodash',
      filename: 'chanel/js/[name].bundle.js'
    },
    main2: {
      import: './src/app3.js',
      dependOn: 'lodash',
      filename: 'chanel2/js/[name].bundle.js'
    },
    lodash: {
      import: 'lodash',
      filename: 'common/js/[name].js'
    }
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '多页面应用-页面index',
      template: './public/index.html',
      inject: 'body',
      filename: 'chanel/index.html',
      publicPath: 'http://wwww.a.com/',
      chunks: ['main', 'lodash']
    }),
    new HtmlWebpackPlugin({
      title: '多页面应用-页面index1',
      template: './public/index2.html',
      inject: 'body',
      filename: 'chanel2/index2.html',
      publicPath: 'http://wwww.b.com/',
      chunks: ['main2', 'lodash']
    }),
  ],
 
}
```