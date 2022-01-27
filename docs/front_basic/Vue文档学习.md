---
title: 'Vue'
date: 2022-01-27
tag:
  - 前端学习
categories:
  - 前端学习
---

## Vue 文档学习

### 其他问题

transform translate 裁剪区跟着元素跑

margin-left 不会

1. 熟悉大体布局（仿写 B 站），熟悉各种交互效果，熟悉最常用的 CSS 属性
2. 不是很常用的 CSS 属性，可以大概了解就行，没必要深究原理
3. 一看就不重要的 CSS 属性，不用管

```js
function A(name, age) {
  console.log(this)
  console.log(name, age)
}
let o = {}
let B = A.bind(o)
B('aaa', 20)
B('bbb', 40)

function A(name, age) {
  console.log(this)
  console.log(name, age)
}
let o = {}
let B = A.bind(o, 'aaa', 20)
B()
B('bbb', 40)
```

https://www.cnblogs.com/yier0705/p/9182262.html

- blur 事件

https://www.cnblogs.com/maopixin/p/10043449.html

document.documentElement.scrollTop 整个 html 文档已经滚动了的距离

1. transform: translate 2. margin 给负值 都可以用来平行元素

二者的行为有点不同。

1/8：

问题一：时间

问题二：search-dialog

```js
async function A() {
  try {
    await Promise.reject(111)
    console.log(1)
  } catch (e) {
    console.log(2)
  }
}

Promise.reject(111)
  .then(() => {})
  .catch(() => {})
```

**自己字面理解**：`.then`前面的是要先执行的，即`.then`后面需要等待前面执行完（promise 状态变成 fullfilled）`fullfilled`的时候，才执行。

`await`后面的是需要等待的异步(promise)，即正好为`.then`前面那部分。async await 更加语义化

请求/响应体不能带汉字符号，所以传输时需要把汉字先编码成字符，收到请求/响应后再对这些字符解码得到对应的汉字。

```js
encodeURI('你好') // "%E4%BD%A0%E5%A5%BD"
encodeURI('http://localhost:8080/home') // "http://localhost:8080/home"
encodeURIComponent('http://localhost:8080/home') // "http%3A%2F%2Flocalhost%3A8080%2Fhome"

decodeURI('%E4%BD%A0%E5%A5%BD') // 你好
```

```js
// 时间是独一无二的，但是表现形式可以不同
let d = new Date()
d.getTime() // 1609861170889 时间戳
d.toLocaleString() // "2021/1/5 下午11:39:30"
d.toISOString() // "2021-01-05T15:39:30.889Z"

new Date(1609861170889).toISOString()
new Date('2021-01-05T15:39:30.889Z').getTime()
```

```js
// 每个Cookie属于指定的一个域/站点
// 访问a.com拿到了Cookie
Cookie: id = 1
Domain = a.com
// 访问 b.com时 请求中不会带上该Cookie
```

```js
// 在a.com向b.com发了个跨域请求
Set-Cookie: id=1; Domain=b.com; sameSite=lax;
// 访问a.com继续向b.com发请求，不会带上Cookie（因为不是sameSite）
// 访问b.com（xxx.b.com）向b.com发请求，可以带上cookie
```

规定：使用 sameSite=None 时，必须设置 Secure 属性，也就是说，请求必须是 HTTPS 请求

HTTPS（更安全的 HTTP） = HTTP + SSL

a.example.com b.example.com

另一种跨域解决方法：设置代理

比如我的本地开发服务器 8080，后端服务器 3000

需要配置

```js
devServer: {
    proxy: 'http://localhost:3000'
},
```

同源策略只针对浏览器。后端不同服务器之间可以正常通信。

```js
// 好的写法
try {
  let data = await User.findOne()
  console.log(data)
  // ...
  let data2 = await User.findOne()
  console.log(222)
} catch (err) {
  console.log(err)
}

// 不好的写法
User.findOne((err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
    User.findOne((err, data) => {
      // 回调地狱
      if (err) {
        // 重复判断
      } else {
      }
    })
  }
})
console.log(222)
```

```js
 fetch('http://localhost:3000/register',{
        method: 'POST',
        body: JSON.stringify({
          nickname: nickname,
          password: password
        }),
        // username=cpp&age=2 这种形式不但可以拼接在路径里面，也可以放在请求体里面
        // post请求
        // 简单请求：'Content-Type' : 'application/x-www-form-urlencoded'    // username=cpp&age=2的形式
        // 复杂请求：'Content-Type' : 'application/json'   // json的形式
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })

    }
```

浏览器它是多线程的，这些多线程包括了：一个主线程（用来解析我们的 JavaScript 代码），其他都是工作线程（用于 I/O 操作的线程，用于发请求的线程，负责定时器的线程）

// 发请求和文件读取写入 Input/Output
// 定时器 setTimeout/setInterval
// 事件 点击事件

```js
fetch(() => {})
fs.readFile(() => {})
setTimeout(() => {})
document.addEventListener(() => {})
```

错误写法 x_x

```js
  async handleChange (value, direction, movedKeys) {
      // 用户id，movedKeys角色id数组
      const { userid } = this.user
      if (direction === 'right') {
        console.log(movedKeys)
        await movedKeys.forEach(item => {
          api.SYS_ROLE_BIND_PUT(item, userid).then(res => {
            console.log(222)
          })
        })
      }
        this.$message.success('绑定成功')
      if (direction === 'left') {
        movedKeys.forEach(item => {
          api.SYS_ROLE_UNBIND_PUT(item, userid).then(res => res)
        })
        this.$message.success('解除绑定成功')
      }
    }
```

```js
await Promise.all(
  movedKeys.map(async (item) => {
    const res = await api.SYS_ROLE_BIND_PUT(item, userid)
    console.log(res)
  })
)
```

对比 x_x

```js
await movedKeys.forEach((item) => {
  api.SYS_ROLE_BIND_PUT(item, userid).then((res) => {
    console.log(222)
  })
})
this.$message.success('绑定成功')

await Promise.all(
  movedKeys.map(async (item) => {
    const res = await api.SYS_ROLE_BIND_PUT(item, userid)
    console.log(res)
  })
)
this.$message.success('绑定成功')
```

发多个请求

1. 按顺序发请求
2. 并发请求

```js
// 实际是并发请求
async function A() {
  arr.forEach(async () => {
    await fetch()
  })
}

async function A() {
  // 等价于
  ;(async () => {
    await fetch()
  })()(async () => {
    await fetch()
  })()(async () => {
    await fetch()
  })()
}

// 按顺序发请求, 这个时候不能用forEach

async function A() {
  let arr = []
  for (let i of arr) {
    await fetch()
  }
  // do something
}

async function A() {
  // 等价于
  await fetch()
  await fetch()
  await fetch()
  // do something
}
```

```js
// 并发请求时，当所以请求都发完后再执行某操作

async function A() {
  let arr = []
  await Promise.all(
    arr.map(async () => {
      await fetch()
    })
  )
}
```

```js
let obj = {
  fn: function () {},
}

// 简写
let obj = {
  fn() {},
}

// 区别是这里的fn是箭头函数而不是普通函数
let obj = {
  fn: () => {},
}
```

每天问的：

1. 数据属性，访问器属性，vue 里面的数据劫持，对象冻结 Object.freeze()

2. 非 prop 属性替换/合并，生命周期 created 和 mounted

3. 组件上的双向绑定输入框/radio/checkbox

4. vue 中 html 的解析过程。

5. flex 布局时，容器中项目有内容，和项目中没有内容时宽度超出容器宽度时的变化分析。

6. 箭头函数返回一个对象的时候，要用括号括起来

7. async，await

8. eslint 可以检测文件的格式，eslint 文件路径 --fix 可以一个一个文件处理格式，会根据已有的 eslintrc.js 文件里面的规定去修改。

9. userbindId,每次再次赋值数据之前清空

10. JWT(Javascript web token)解决跨域认证

11. 导航守卫

12. Map 针对对象的不足，不仅仅键值为字符串，

    Set 可以做到数组里面的元素不重复,

    WeakMap，WeakSet 弱引用，不计入引用计数，垃圾回收机制，根据引用计数

13. super，class，es5 继承

14. 爬虫原理，服务端渲染

15. 处理 post 请求

- **HTTP `POST` 方法** 发送数据给服务器. 请求主体的类型由 [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 首部指定.

参考[](https://imququ.com/post/four-ways-to-post-data-in-http.html)

lg:[https://messiahhh.github.io/blog/frontend/node.html#%E5%A4%84%E7%90%86post%E8%AF%B7%E6%B1%82-%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0]()

```js
// 用户
// {
//   user,
//   password,
//   id,
//   time,
//   role: [0, 1, 2],
// }

// 角色
// {
//   id: 0,
//   title: '学生'
// },
// {
//   id: 1,
//   title: '老师'
// }
```

16. fs.readFile()使用的相对路径，是相对于执行 node 代码时所在的目录
    也就是 process.cwd()

`__dirname`：返回当前文件所在的绝对路径

`process`: 获取执行脚本时所在的目录

17. `:focus`，`:focus-within`
18. `@focus=""`,`@blur=""`
19.

#### reduce 用法

1. **累加对象数组里的值**

```js
// 要累加对象数组中包含的值，必须提供初始值，以便各个item正确通过你的函数。
const lg = [
  { name: 'cpp', age: 2 },
  { name: 'cjz', age: 3 },
  { name: 'clg', age: 12 },
  { name: 'lg', age: 5 },
]

const lgName = lg.reduce((prev, next) => `${prev} ${next.name}`, '')

console.log(lgName)
// cpp cjz clg lg
```

2. **将二维数组转化为一维数组**

```js
const flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((pre, next) => pre.concat(next), [])

console.log(flattened)
// [0, 1, 2, 3, 4, 5]
```

#### 数据劫持

一：对象有很多属性，每个属性都有一个属性描述符（descriptor）。

```js
// 数据属性的属性描述符
configurable: true // 每一行其实就是一个特性
enumerable: true
value: 20
writable: true
```

二：对象的属性其实分两个类型，数据属性和访问器属性。

```js
// 访问器属性的属性描述符
configurable: true
enumerable: true
get: function () {
    // 通过obj.p取值的时候，调用该函数（getter）
}
set: function() {
    // 通过obj.p = xxx 赋值的时候，调用该函数（setter）
}
```

三：Vue 的数据劫持/响应式系统

当创建实例的时候，我们会传进去一个 data/对象，vue 会遍历这个对象的所有属性，把属性从原本的数据属性转化为访问器属性。

```js
value: xxx
writable: true
===>>>
get: function() {
    // 收集依赖。当根据模板和数据渲染页面的时候，知道用到了哪些属性
    return xxx
}
set: function() {
    // 当修改data的属性时，调用setter，从而再一次根据模板和新数据来渲染页面，刷新视图。
}
```

```js
// 模板用到了name，没用到age属性
// 当我们通过赋值obj.age，虽然会调用set方法，但因为收集了依赖，知道age属性用不到，所以不会重新刷新页面
<p>{{name}}</p>

let obj = {
    name: 'www',
    age: 20,
}

data: function () {
    return obj
}

for (let i in obj) {
    Object.defineProperty(obj, i, {
        get: function () {

        },
        set: function () {

        }
    })
}
```

#### JS 高阶函数的使用

```js
const nums = [1, 2, 12, 20, 3, 4, 8, 100, 22, 23, 24]
//filter函数的使用
//22,23,24,100
let total = nums
  .filter((item) => item < 24)
  .map((item) => item * 2)
  .reduce((preValue, item) => item + preValue, 0)
console.log(total)
```

### Vue

- 除了数据属性，Vue 实例还暴露了一些有用的 property 与方法，它们都有前缀$,以便于用户定义的 property 区分开来。

```js
vm.$data === data // true
vm.$el === document.getElementById('example') // true
```

#### 响应式原理

**Vue 双向绑定的原理**

Vue 是通过数据劫持结合发布-订阅模式的方式，实现的双向绑定。通过`Object.defineProperty()`来劫持属性的，使用属性的时候触发`getter`函数，收集依赖；修改属性的时候触发`setter`函数，触发相应的回调。

1. Observer 对数据的属性进行递归遍历，使用 Object.defineProperty 进行数据劫持。
2. Compiler 用于将模板编译为渲染函数，并渲染视图页面。
   1. parser 使用正则等方式解析 template 中的指令，class，style 等数据，生成 AST(抽象语法树)
   2. optimize 进行优化，标记静态节点，该节点会跳过 diff。
   3. generate，把 AST 树转化为渲染函数，渲染函数用于生成虚拟 DOM
3. Watcher 是 Observer 和 Compiler 之间通信的桥梁。
   1. 自身实例化的时候，调用 getter 函数，向 deps 添加 watch
   2. 当数据修改时，调用 setter 函数，调用 deps.notify,执行 watch 的 update 函数。
   3. 执行 watch 的 update 函数，重新生成虚拟 DOM，并进行 Diff 对页面进行修改。

**注意**：`Object.defineProperty`

1. Vue 不能检测对象属性的添加和删除。

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。例如：

```js
var vm = new Vue({
  data: {
    a: 1,
  },
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
```

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property。例如，对于：

```js
Vue.set(vm.someObject, 'b', 2)
```

您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```js
this.$set(this.someObject, 'b', 2)
```

2. Vue 不能监测以下数组的变动：
   1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
   2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

**举个例子：**

```js
const vm = new Vue({
  data: {
    items: ['a', 'b', 'c'],
  },
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

**一般数组：**

```js
const arr = [1, 2, 3, 4]
undefined
arr.length = 2
arr // [1, 2]
```

**解决方法:**

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

你也可以使用 [`vm.$set`](https://cn.vuejs.org/v2/api/#vm-set) 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

```js
vm.$set(vm.items, indexOfItem, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

```js
vm.items.splice(newLength)
```

#### 计算属性和侦听属性

**计算属性**是基于它们的响应式依赖进行缓存的。只在响应式依赖发生改变时它们才会重新求值。

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter

Vue 提供了一种更通用的方式来观察和响应 Vue 实力上的数据变动：**侦听属性**

truthy

true

#### 条件渲染

`v-if`是真正的条件渲染，因为它会确保在切换过程中条件内的事件监听器和子组件适当地被销毁和重建。

`v-if`也是惰性的：如果在初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show`就简单的多，不管初始条件是什么，元素总会被渲染，并且只是简单的基于 CSS 进行切换。

总结：`v-if`有更高的切换开销，而`v-show`有更高的初始渲染开销。因此如果需要非常频繁的切换，则使用`v-show`较好；如果运行条件很少改变，则使用`v-if`较好。

#### 数组更新检测

**变更方法**

Vue 将被侦听的数组的变更方法进行了包裹。所以它们也将触发试图更新。这些被包裹的方法包括：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

**替换数组**

- `filter()`
- `concat()`
- `slice()`

#### 事件处理

如果需要在内联语句中处理器中访问原始的 DOM 事件。可以用特殊变量`$event`把它传入方法：

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

**事件修饰符**

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名

- `.enter`

* `.tab`
* `.delete` (捕获“删除”和“退格”键)
* `.esc`
* `.space`
* `.up`
* `.down`
* `.left`
* `.right`

你还可以通过全局 `config.keyCodes` 对象[自定义按键修饰符别名](https://cn.vuejs.org/v2/api/#keyCodes)：

```js
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

#### 表单输入绑定

`v-model`

```html
<input v-model="searchText" />
```

等价于：

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
/>
```

当用在组件上时，`v-model`则会这样：

```html
<custom-input v-bind:value="searchText" v-on:input="searchText = $event">
</custom-input>
```

为了让它正常工作，这个组件内的`<input>`必须：

- 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

```html
Vue.component('custom-input', { props: ['value'], template: `
<input v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
` })
```

```html
<custom-input v-model="searchText"></custom-input>
```

#### 组件

**一个组件的 `data` 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝：

##### 通过 Prop 向子组件传递数据

### 小知识点

- Object.freeze()会阻止修改现有的 object.property

```javascript
const obj = {
  name: 'cpp',
  age: 2,
}
//undefined
Object.freeze(obj)
//{name: "cpp", age: 2}
obj.name = 'cjz'
//"cjz"
obj
//{name: "cpp", age: 2}
```

**`Object.freeze()`** 方法可以**冻结**一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。`freeze()` 返回和传入的参数相同的对象。

- 除了数据属性，Vue 实例还暴露了一些有用的 property 与方法，它们都有前缀$,以便于用户定义的 property 区分开来。

**注意**：不要在选项 property 或回调上使用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，比如

`created: () => console.log(this.a)` 或

`vm.$watch('a', newValue => this.myMethod())`。

因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致

`Uncaught TypeError: Cannot read property of undefined` 或

`Uncaught TypeError: this.myMethod is not a function` 之类的错误。

- 这里`v-if 指令将根据表达式 `seen`的值的真假来插入/移除`<p> 元素。

```html
<p v-if="seen">现在你看到我了</p>
```

#### 动态参数

- 用方括号[]括起来的 JavaScript 表达式作为一个指令的参数：

```javascript
<a v-bind:[attributeName]="http://www.bilibili.com">
    哔哩哔哩动画
</a>

data () {
        return {
          attributeName: 'href',
          url:'https://www.bilibili.com'
        }
    },

```

这里的==attributeName==会被作为一个 JavaScript 表达式进行动态求值，求得的值将作为最终的参数来使用。

```javascript
:href = "url"
等价
:['href'] = 'url'
```

- 同样地，也可以使用动态参数为一个动态的事件名绑定处理函数：

```javascript
<a v-on:[eventName]="doSomething"> 动态参数绑定事件名</a>

data () {
  return {
   eventName: 'click'
  }
},

methods: {
  doSomething() {
   console.log(this)
  }
},
```

```javascript
v-on:[eventName]
//等价于
v-on:click
```

- 动态参数预期会求出一个字符串，异常情况下值为 null，这个特殊的 null 值可以被显性的用于移出绑定。任何其他非字符串类型的值都将会触发一个警告。

#### 组件的 data 必须是一个函数，返回一个对象

为什么组件里面 data 必须是一个函数？

```js
// 这个
// obj本质上是一个内存地址
// 调用函数返回的obj
// 所以得到的结果obj1,obj2,obj3   都是obj内存地址
// 所以是同一个对象，改变其中一个对象的属性，其他的也会改变
const obj = {
  name: 'cpp',
  age: 2,
}
function abc() {
  return obj
}
//obj1指向函数的返回值，函数的返回值为obj
//其他两个一样，都是obj，改变其中一个，其他的也改变
let obj1 = abc()
let obj2 = abc()
let obj3 = abc()
obj1.name = 'cjz'
console.log(obj1)
console.log(obj2)
console.log(obj3)
```

```js
// 函数每次执行的时候都会在自己的栈空间创建一个新变量，是obj的内存地址，所以会创建一个新的对象返回
// 内存地址
function abc() {
  return {
    name: 'cpp',
    age: 2,
  }
}
let obj1 = abc()
let obj2 = abc()
let obj3 = abc()
obj1.name = 'cjz'
console.log(obj1)
console.log(obj2)
console.log(obj3)
```

#### 计算属性

**计算属性的 getter，setter 方法**

computed 默认只有 getter 函数，也可以给它设置 setter 函数，一般只需要 gettter 函数。一般没有 set 方法，只读属性

设置值会调用 set 方法。

计算属性本质上是的一个属性

```javascript
<p>全名{{fullName }}</p>
<p>名{{firstName}}</p>
<p>姓{{lastName}}</p>
<button @click="changeName">点击更新姓名</button>

firstName: 'pp',
lastName: 'cheng',

computed: {
      fullName: {
        get:function() {
          return this.firstName+ ' ' + this.lastName
        },
        set: function(newValue) {
          const names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    },



changeName() {
        this.fullName = 'John Doe'
        console.log(this.fullName)
      }



```

```javascript
computed: {
  fullName: {
    get:function() {
    return this.firstName+ ' ' + this.lastName
  },
},
//简写为
computed: {
    fullName: function() {
        returen this.firstName + ' ' + lastName
    }
}
```

**计算属性的缓存**

计算属性会观察内部有没有变化，没有变化不会重新调用

##### let/const

- 没有块级作用域引起的问题：

if 的块级

```javascript
//2、没有块级作用域引起的问题:if的块级
//if里面的变量在外面也能使用
var func
if (true) {
  var name = 'cpp'
  console.log(name)
  func = function () {
    console.log(name)
  }
  name = 'cjz'
  func()
}
func()
console.log(name)
```

for 的块级

- 当在一个组件上使用 class 时，这些 class 将被添加到该组件元素的根元素上

```javascript
var btns = document.querySelectorAll('button')
for (var i = 0; i <= btns.length - 1; i++) {
  btns[i].addEventListener('click', function () {
    console.log('点击了第' + parseInt(i + 1) + '个按钮')
  })
}
```

```javascript
//解决方法，闭包
//为什么闭包可以解决问题：函数是一个作用域
var btns = document.querySelectorAll('button')
for (var i = 0; i <= btns.length - 1; i++) {
  ;(function (i) {
    btns[i].addEventListener('click', function () {
      console.log('点击了第' + parseInt(i + 1) + '个按钮')
    })
  })(i)
}
```

```js
//ES6的解决方法
const btns = document.querySelectorAll('button')
for (let i = 0; i <= btns.length - 1; i++) {
  btns[i].addEventListener('click', function () {
    console.log('点击了第' + parseInt(i + 1) + '个按钮')
  })
}
```

**在开发中优先使用 const。只有需要改变某一个标识符的时候才使用 let**

**注意一**：一旦使用 const 修饰的标识符被赋值之后，不能修改

```js
const a = 12
a=20
//修改后报错
VM3890:1 Uncaught TypeError: Assignment to constant variable.
    at <anonymous>:1:2
(anonymous) @ VM3890:1
```

**注意二**：在使用 const 定义标识符，必须进行赋值

```js
const name;
//没有赋值直接报错
VM4220:1 Uncaught SyntaxError: Missing initializer in const declaration
```

**注意三**：常量的含义是指向的对象的对象不能修改，但是可以改变对象内的属性

```js
const obj = {
    name: 'cpp',
    age: 12,
    like: 'game'
}
obj.lover = 'wqj'

obj
{name: "cpp", age: 12, like: "game", lover: "wqj"}
obj.name = 'cjz'
obj
{name: "cjz", age: 12, like: "game", lover: "wqj"}

//将obj指向另一个对象时，如
obj = {}
//报错，未捕获类型错误:对常量变量的赋值。
Uncaught TypeError: Assignment to constant variable.
```

#### event 对象

#### v-model

v-model 其实就是一个语法糖，这背后其实做了两个操作

1. v-bind 绑定一个 value 属性
2. v-on 指令给当前元素绑定 input 事件

**一：原生表单元素中**

```html
<input v-model="something" />
```

就相当于

```html
<input v-bind:value="something" v-on:input="something = $event.target.value" />
```

**二：在自定义组件中**

```html
<my-component v-model='something'></my-componment>
```

相当于

```html
<my-component
  v-bind:value="something"
  v-on:input="something = arguments[0]"
></my-component>
```

**这时候，something 接受的值就是 input 事件回调的第一个参数，所以在自定义组件中，要实现数据绑定，还需要使用 `$emit`去触发 input 的事件**

```js
this.$emit('input', value)
```

- 这两句很重要，默认就是

```html
<input v-model="value" />
<input v-bind:value="value" v-on:input="value= $event.target.value" />
```

#### 在组件上使用 v-model

**一：原生表单元素中**

```html
<input v-model="searchText" />
等同于
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
/>
```

**二：在自定义组件中**

```html
<custom-input v-model="searchText"></custom-input>
等价于
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

为了组件内部能够有效运行，组件内<input>必须：

- 将`value`属性绑定到`value`prop
- 在`input`输入框中，在自定义的`input`事件中，发送一个新的值

**难点**

在一个组件中，`v-model` 默认使用 `value` 作为 prop，以及默认使用 `input` 作为监听事件，然而，对于某些类型的 input 元素（例如 checkbox 和 radio），由于这些类型的 input 元素本身具有 [不同用法](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)，可能会占用 `value` 特性。在这种情况下，使用组件的 `model` 选项可以避免冲突

```html
Vue.component('base-checkbox', { model: { prop: 'checked', event: 'change' },
props: { checked: Boolean }, template: `
<input
  type="checkbox"
  v-bind:checked="checked"
  v-on:change="$emit('change', $event.target.checked)"
/>
` })
```

不是很理解，万能解惑秘诀，问 lg=x-x

父组件模板：

```html
<template>
  <div class="parent-model">
    <div class="parent-text">
      <h3>我是父组件的input</h3>
      <input type="text" @input="controlValue" />
      <span>{{someText}}</span>
    </div>
    <child-model v-model="someText" />
    <!-- child-model v-bind:value="someText" v-on:input="someText = $event" -->
    <child-model-radio v-model="isChecked" />
    <button @click="changeChecked">点击改变子组件checked状态</button>
    {{ isChecked }}
  </div>
</template>
```

input 输入框时，子组件上

子组件模板:

```html
<template>
  <div class="child-model">
    <div class="test-text">
      <h4>我是自组件的input</h4>
      <input
        type="text"
        :value="value"
        @input="$emit('input',$event.target.value)"
      />
      <span>{{value}}</span>
    </div>
    <hr />
  </div>
</template>
```

input 为 radio 单选框时，子组件上

子组件模板：

```html
<template>
  <div class="">
    <div class="test-radio">
      <!-- 原理 -->
      <label for="man">
        男
        <input
          type="radio"
          :checked="value"
          @change="$emit('input', $event.target.checked)"
        />
      </label>
      <label for="woman">
        女
        <input
          type="radio"
          :checked="!value"
          @change="$emit('input', !$event.target.checked)"
        />
      </label>
    </div>
  </div>
</template>
```

input 输入框

```html
<child-model v-model="someText" />
等价于
<child-model v-bind:value="someText" v-on:input="someText = $event" />
```

因为默认 prop 是 value，所以这里等价于下面，

```html
<child-model-radio v-model="isChecked" />
等价于
<child-model-radio v-bind:value="isChecked" v-on:input="isChecked=$event" />
```

在子组件里面，input 绑定里面

- 首先这里的`:checked`是在给 input 的属性动态绑定我们通过父组件传过来的 prop`value`，
- `@chang`同样,这是监听到 input 本身的 chang 事件的时候，发出一个事件给父组件。
- 官网的通过 model 指定 prop 和 event，就是指定了一下我们赋值给`:checked还有@checked`后面的默认 value 和 input，使得更有语义化？？？不知道我乱编的名字的，大概这个意思

```js
:checked="value"
@change="$emit('input', $event.target.checked)"
```

props 里面

```
 props: {
      value: {
        type: Boolean,
      }
    },
```

**因为在 radio 和 checkbox 时，我们需要的确定的是 checked 属性，不需要 value，所以所以其实本质上 props 的还是名为 value 的变量，但是这个时候绑定给 checked 属性，同理，因为 radio 和 checkbox 的监听事件是 change。**

**所以官网写法 model 的作用感觉只是将**

<child-model-radio v-model="isChecked"/>

**里面的 v-model 内部的默认名为 value 的 prop 和名为 input 的事件指定了一种更加符合理解的名称而已。**

**二、**

#### 扩展.sync

真正的双向绑定会产生一些维护问题，更推荐通过子组件触发`update:my-prop-name`事件的方式，来更新父组件的状态。

例如，在一个接收 `title` prop 的假想组件中，我们想要分配一个子组件的新值给父组件的意图，可以通过通信机制来实现：

```js
this.$emit('update:title', newTitle
```

```html
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

等价于

```html
<text-document v-bind:title.sync="doc.title"></text-document>
```

#### 将原生事件绑定到组件.native

#### mixin

- data：冲突情况下，优先使用组件自身的 data

- 具有相同名称的钩子函数，将合并到一个数组中，最终它们会被依次调用。此外，需要注意，mixin 对象中的同名钩子函数，会在组件自身的钩子函数**之前**调用。

- `methods`, `components` 和 `directives`，这些值为对象的选项(option)，则会被合并到相应的选项对象上。但是，在二者的键名(key)发生冲突时，就会优先使用组件选项对象中键值

```js
let mixin = {
  data() {
    return {
      name: 'cpp',
      age: 2,
    }
  },
  created() {
    console.log('mixin 中的钩子函数被调用')
  },
  methods: {
    like() {
      console.log('like game')
    },
    conficting() {
      console.log('from mixin')
    },
  },
}
let vm = new Vue({
  mixins: [mixin],
  data() {
    return {
      name: 'clg',
      lover: 'wqj',
    }
  },
  created() {
    console.log(this.$data)
    console.log('组件中的钩子函数被调用')
  },
  methods: {
    hate() {
      console.log('hate smoke')
    },
    conficting() {
      console.log('from self')
    },
  },
})
vm.like()
vm.hate()
vm.conficting()

//mixin 中的钩子函数被调用
//{
//   age: 2
//   lover: "wqj"
//   name: "clg"
// }
//组件中的钩子函数被调用

//like game
//hate smoke
//from self
```

#### 自定义指令

```html
<div id="app">
  <input type="text" />
  <input type="text" v-focus />
</div>
<script>
  Vue.directive('focus', {
    //指令定义对象
    inserted(el) {
      el.focus()
    },
  })
  let vm = new Vue({
    el: '#app',
    data: {},
  })
</script>
```

指令的定义对象提供了几个钩子函数

- bind：在指令第一次绑定到元素时调用，只会调用一次，可以在此钩子函数中，执行一次性的初始化设置。
- inserted：在已经绑定的元素插入到父节点时调用（只能保证父节点存在，不一定存在于 document 中）
- update：在包含该指令的 VNode 更新后调用
- componentUpdated
- unbind

**v-if**

- 因为 v-if 是一个指令，所以必须将它添加到一个元素上，但是如果想切换多个元素呢？此时可以把一个<template>元素当作不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含<template>元素。

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

**用 key 管理可复用组件的元素**

**注意**：v-show 不支持<template>元素，也不支持 v-else

**过滤器**

**一：全局过滤器**

1. Vue.filter('过滤器名字',(v) => {})
2. (v)=>{return 处理的结果}
3. 在视图中{{被处理的数据 | 过滤器的名字}}

> 注意： v 参数是自带的，不需要手动传入。

```html
<div id="app">
  <p>处理前：{{msg}}</p>
  <p>处理后：{{msg | toUpper}}</p>
</div>
```

```js
// 全局过滤器
// 在new Vue之前，
// 步骤
// 1.在new Vue之前Vue.filter('过滤器名字',function() {})定义过滤器
// 2.在过滤器的函数中，实现具体的格式处理function(v){}
// v是当前过滤器的调用者 被处理的数据 自带参数
// 3.在视图中使用过滤器{{msg|过滤器名字}}

// 需求： "abc"->"Abc"
Vue.filter('toUpper', (v) => {
  // v其实就是msg也就是'abc'
  // v是自带参数，不需要我们传入
  // chartAt()取出下表为0的字符
  // substr()截取字符串
  // slice()
  // "abc".charAt(0).toUpperCase()+"abc".slice(1)
  return v.charAt(0).toUpperCase() + v.slice(1)
})
new Vue({
  el: '#app',
  data: {
    msg: 'abc',
  },
})
```

**二：局部过滤器**

```html
<div id="app">
  <p>处理前：{{msg}}</p>
  <p>处理后：{{msg | toUpper}}</p>
</div>
```

```js
new Vue({
  el: '#app',
  data: {
    msg: 'abc',
  },
  methods: {},
  filters: {
    toUpper: (v) => {
      return v.charAt(0).toUpperCase() + v.slice(1)
    },
  },
})
```

**过滤器的传参数和串联使用**

1. 传参数{{msg | 过滤器名字(自己的参数)}} -> (v,y)=>{y 指的是自己}
2. 串联{{msg | 过滤器 A | 过滤器B}}

> 注意，过滤器 B 处理的是过滤器 A 所 return 的结果

v-if 和 v-else 区别：

- v-if 是真正的条件渲染，因为他会确保在切换中条件内的事件监听器和子组件适当的被销毁和重建
- `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
- 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

- 也可以用 v-for 来遍历一个对象的 property

**key**

[key 的详细用法解释及原理](https://cn.vuejs.org/v2/api/#key)

- 元素上的 key 属性

vue 在把元素/dom 真正渲染到浏览器之前，有做一个操作，它会把所有的 dom 先抽成一个虚拟 dom，

先会放到内存里面创建虚拟 dom，出于性能考虑，它会复用已有的元素。

加个 key，key 不同说明不可以复用。

- 组件上的 key 属性

**v-for**

[显示过滤排序后的结果](https://cn.vuejs.org/v2/guide/list.html#%E6%98%BE%E7%A4%BA%E8%BF%87%E6%BB%A4-%E6%8E%92%E5%BA%8F%E5%90%8E%E7%9A%84%E7%BB%93%E6%9E%9C)

**v-for 也可以接受整数，在这种情况下，它会把模板重复对应次数**

```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

结果： 1 2 3 4 5 6 7 8 9 10

<template>上使用 v-for

**v-for 与 v-if**

- 当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你只想为*部分*项渲染节点时，这种优先级的机制会十分有用，

**自定义按键修饰符别名**

[自定义按键修饰符别名](https://cn.vuejs.org/v2/api/#keyCodes)

```javascript
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  'media-play-pause': 179,
  up: [38, 87],
}
```

```html
<input type="text" @keyup.media-play-pause="method" />
```

#### 表单输入绑定

- 可以用 v-model 指令在表单`<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。

**注意**：v-model 会忽略所有表单元素的 value、checked、selected 属性的初始值，而总是将 Vue 实例的数据作为数据来源，

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 `value` property 和 `input` 事件；
- checkbox 和 radio 使用 `checked` property 和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

**对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：**

v-model 修饰符：

.lazy

.number

.trim

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件

### 深入了解组件

#### Prop

- required 要求用组件时，必须传值
- default 类型是数组或者对象时，默认值必须是一个函数

```js
default() {
	return []
}
```

- 非 prop 的 Attribute（特性）

  所谓非 prop 特性，就是指它可以直接传入组件，而不需要定义相应的 prop。比如，class，id，style

[非 prop 属性](https://segmentfault.com/a/1190000010699647)

##### 子组件只有 input 元素时（input 为根元素）

**代码**

```js
//给组件传入
<div id="app">
    <my-comp
      data-title="learn vue"
      type="text"
      value="vue 啦啦啦啦啦"
      class="myclass"
      style="color: red"></my-comp>
  </div>

//组件模板
<template id="my-comp">
    <input class="test-input"
           style="font-size: 40px"
           type="date"
           value="vue 啊啊啊啊啊"
           data-title="love vue"
		   ref="input">
  </template>

//在控制台检查元素，发现传过来的非prop属性
//type="date" data-title="learn vue"会覆盖根元素input本身的的type，和data-title
//而传过来的class和style反而会合并到input本身的class和style上面

```

**截图**

![image-20201208192428699](C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201208192428699.png)

- 当添加 **inheritAttrs: false**后

1. 继承的 type,data-title 非 prop 特性被禁用
2. 禁用对 class，style 不起作用，通过继承 class，style 设置的样式还作用于元素本身。

![image-20201208192610278](C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201208192610278.png)

**打印 dataset.title**

疑惑点：

- 本来在 created 里面操作 dom 会报错才对，可是通过继承下来的 class 属性在 created 里面获取 input 元素竟然不报错，用它本身的·class 属性和$refs 方法获取 input 元素都会报错。

- 明明设置了**inheritAttrs: false**，可是在 created 里面却还是能够通过(dataset.title)获取到继承下来的 data-title 的值

- 发现在 mounted 里面操作一切都是符合情理的

不设置**inheritAttrs: false**时

```js
//在created里面通过继承的class能够读取到data-title的值
created() {
        let input0 = document.querySelector('.myclass')
        console.log(input0.dataset.title)
        this.title = input0.dataset.title
        console.log(this.title)
        let h3 = document.createElement('h3')
        let body = document.querySelector('body')
        h3.innerHTML = this.title
        body.append(h3)

    	//通过自身的class获取照样会报错
    	// this.title = this.$refs.input.dataset.title
        // let input = document.querySelector('input')
        // let input = document.querySelector('.test-input')
        // console.log(input.dataset.title)
}，

```

设置**inheritAttrs: false**时

```js
//即使设置了inheritAttrs: false，控制台元素上检查，data-title继承的已经被禁用，显示的是自身的，可是依然能通过继承的class获取到元素，并且获取到通过dataset.title获取到data-title并且赋值给title
//在created里面
inheritAttrs: false,
created() {
        let input0 = document.querySelector('.myclass')
        // console.log(input0.dataset.title)
        this.title = input0.dataset.title
        console.log(this.title)  //learn vue
        let h3 = document.createElement('h3')
        let body = document.querySelector('body')
        h3.innerHTML = this.title
        body.append(h3)
},

mounted() {
    //因为class会合并，设置了它也还是在元素上，所以依然可以通过传过来的class获取对应元素
        // let input1 = document.querySelector('.myclass')
        // console.log(input1.dataset.title)
        // this.title2 = input1.dataset.title
        // let h2 = document.createElement('h2')
        // let body = document.querySelector('body')
        // h2.innerHTML = this.title2
        // body.append(h2)

        // let input = document.querySelector('.test-input')
        // console.log(input.dataset.title)

        this.title2 = this.$refs.input.dataset.title
        console.log(this.title2)

        let h2 = document.createElement('h2')
        let body = document.querySelector('body')
        h2.innerHTML = this.title2
        body.append(h2)
      }
    })

```

##### 子组件根元素为 div 里面包裹内容时

验证 created 里面操作 dom 元素会报错

```js
<div id="app">
    <comp></comp>
  </div>
  <template id="myDiv">
    <div class="innerDiv">
      <span class="mySpan">啦啦啦啦</span>
    </div>
  </template>

<script>
    Vue.component('comp',{
      template: "#myDiv",
      data() {
        return {
          content: ''
        }
      },
      //created里面获取到的dom元素输出为空，所以对它们进行操作会报错
      created() {
        let innerDiv = document.querySelector('.innerDiv')
        let mySpan = document.querySelector('.mySpan')
        console.log(innerDiv) //null
        console.log(mySpan)	//null

        //操作元素时会报错时
        // this.content = mySpan.textContent
        // console.log(this.content)
      },
      mounted() {
        //挂载后操作正常
        let mySpan = document.querySelector('.mySpan')
        console.log(mySpan)
        this.content = mySpan.textContent
        console.log(this.content)
      }
    })
```

**所以，在 created 里面是不可以操作 dom 元素的**

**同理，传递的 data-title 替换了组件根元素本身 div 的 data-title，传递的 class，style 和子组件根元素本身的 class，style 合并**

```html
<div id="app">
  <my-comp data-title="learn vue" class="myclass" style="color: red"> </my-comp>
</div>

//子组件模板
<template id="my-comp">
  <div class="test" data-title="love vue" style="font-size: 20px" ref="testdiv">
    我是组件
    <h2>{{title}}</h2>
    <div class="test-inner">
      <h2>啦啦啦啦啦</h2>
    </div>
  </div>
</template>
```

![image-20201208215931691](C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201208215931691.png)

**没有设置 inheritAttrs: false 时**

```js
//通过传入的calss获取并且赋值拿到的data-title给title
created() {
        let myDiv0 = document.querySelector('.myclass')
        console.log(myDiv0.dataset.title)
        this.title = myDiv0.dataset.title
}
```

界面显示：

![image-20201208220615524](C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201208220615524.png)

==**上面是自己被绕了一下午的的弯路**==，**PP**三句话就给我整清楚了，

- 分别在注册组件之前的全局，created，mounted 里面打印通过继承过来的类名获取到的**标签元素**,X-X,其实自己定义的组件也可以通过类名去获取到，当时自己思考的太狭隘太死板了。
- 前面两个打印到的都是‘标签’为自己自定义的元素节点，mounted 里面因为自定义模板里面的元素已经替换了**自定义的标签**（我也不知道叫什么，为了理解随便叫=-=），才知道真正的挂载是用自己在组件里面定义的模板和数据，替换了原本自己自定义那个标签，渲染好页面，其中 class，style 合并到挂载后模板里面根元素的属性上，其他传过来的非 prop 属性会覆盖模板根元素里面的同名属性。在挂载后，通过类名获取到的就是根元素例如这里就是 input。
- created 里面是不能操作元素，但是因为==<my-com></my-com>==是我们自己及定义好的，所以挂载前通过类名获取到的是它

```js
<div id="app">
    <my-comp
      data-title="learn vue"
      type="text"
      value="vue 啦啦啦啦啦"
      class="myclass"
      style="color: red">
    </my-comp>
</div>
  <template id="my-comp">
    <input class="test-input"
           style="font-size: 40px"
           type="date"
           value="vue 啊啊啊啊啊"
           data-title="love vue"
           ref="input">
  </template>


let targetEl = document.querySelector('.myclass')
console.log(targetEl)

Vue.component('my-comp',{
  template: '#my-comp',
    data() {
      return {
        title:'aaaaa',
        title2:''
  }
},
  created() {
    let targetEl = document.querySelector('.myclass')
    console.log(targetEl)
    },
  mounted() {
	let targetEl = document.querySelector('.myclass')
	console.log(targetEl)
	}
})
```

**控制台**

<img src="C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201209092037793.png" alt="image-20201209092037793" style="zoom:80%;" />

设置了**inheritAttrs: false**后，就会组件的根元素继承 attribute，所以挂载后组件根元素里面显示本身的属性。

<img src="C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201209092254156.png" alt="image-20201209092254156" style="zoom:80%;" />

**$attrs**和 ​**$listeners**

**$attrs**:

包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。

- vue 中传值一般父子组件传值可以通过 props，通过触发($emit)自定义事件来使子组件与父组件通信，但是当层级嵌套比较多的时候，props 就很麻烦。（当然还可以用 vuex 和事件总线 x_x）

一：根组件模板

**说明**：根组件向自己的子组件==<attrs-test/>==传入 rootMessage 属性

```html
<template>
  <div id="app">
    <attrs-test rootMessage="我来自根组件传" />
    <router-view />
  </div>
</template>
```

二： 父组件模板

**说明**：首先，向子组件传入 message、content、class、style、title 五个属性

```html
<template>
  <div class="attrs-test">
    <child-com
      message="hi vue"
      :content="content"
      class="test-class"
      style="color: purple"
      title="learn vue"
    />
    <div class="attrs-rootmessage">
      <h2>来自根元素的非prop属性</h2>
      <h3>{{this.$attrs.rootMessage}}</h3>
    </div>
  </div>
</template>
```

三： 孙子组件模板

**说明**：孙子组件自身也有自己的 message、content、class 还有单独设置的 style 样式

```html
<template>
  <div class="child-com" message="学习vue" content="你好vue">
    <div class="child-title">
      <h2>这里是父组件传入的prop属性title</h2>
      <span>{{title}}</span>
    </div>

    <div class="child-message">
      <h2>这里是传入的非prop属性message</h2>
      <span>{{this.$attrs.message}}</span>
    </div>
    <div class="child-message">
      <h2>这里是传入的非prop属性content</h2>
      <span>{{this.$attrs.content}}</span>
    </div>
    <div class="child-message">
      <h2>这里是传入的非prop属性content</h2>
      <span>{{this.$attrs.rootMessage}}</span>
    </div>
  </div>
</template>
```

```
父组件
message="hi vue"
:content="content"
class="test-class"
style="color: purple"
title="learn vue"

孙子组件
class="child-com"
message="学习vue"
content="你好vue"
```

**查看控制台**：

Elements：

- 可以看到父组件根元素上继承了根组件传过来的 rootMessage 属性(如果传了 class,style，会合并到根元素上，懒得写了)
- 可以看到孙子组件的根元素上，传过来的非 prop 树形覆盖了孙子组件自身的除了**class 和 style**之外的同名属性（也就是**替换/合并**）

![image-20201209113929418](C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201209113929418.png)

**获取传过来的非 prop 属性**：$attrs

可以通过$attrs 获取到非 prop 属性

![image-20201209114512510](C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201209114512510.png)

**当添加 inheritAttrs: false 后**

不会继承除 class/style 之外的其他非 prop 属性，元素上显示的是自身的属性值

<img src="C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201209114859155.png" alt="image-20201209114859155" style="zoom:80%;" />

**注意**：但是依然可以通过$attrs 获取到非 prop 属性

孙子组件想要获取根组件传递的 rootMessage 属性，只需要在传的时候添加**v-bind="$attrs"**

```html
<template>
  <div class="attrs-test">
    <child-com
      message="hi vue"
      :content="content"
      class="test-class"
      style="color: purple"
      title="learn vue"
      v-bind="$attrs"
    />
    <div class="attrs-rootmessage">
      <h2>来自根元素的非prop属性</h2>
      <h3>{{this.$attrs.rootMessage}}</h3>
    </div>
  </div>
</template>
```

**查看控制台发现孙子组件也获取到了根组件传递下来的属性 rootMessage**

![image-20201209115509073](C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201209115509073.png)

**==注意==**：孙子（child-com）组件里获取到 this.$attrs 的值是除了父组件声明的元素！比如在父组件和根组件传的时候都添加 name 属性

根组件 App

```html
rootMessage="我来自根组件传" message="啦啦啦啦啦hellovue" name="wqj"
```

父组件 attrsTest

```html
message="hi vue" :content="content" class="test-class" style="color: purple"
title="learn vue" v-bind="$attrs" name="cjz"
```

孙子组件的 name 是来自于父组件的

<img src="C:/Users/wang/AppData/Roaming/Typora/typora-user-images/image-20201209121301781.png" alt="image-20201209121301781" style="zoom:67%;" />

**inheritAttrs: false**设置不设置，不影响**$attrs**获取非 prop 属性

**包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。**

**$listeners**:

包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

添加

**v-on="$listeners"**

根组件中

```html
<attrs-test
  rootMessage="我来自根组件传"
  message="啦啦啦啦啦hellovue"
  name="wqj"
  @testChangName="changName"
/>
```

父组件中

```html
<child-com
  message="hi vue"
  :content="content"
  class="test-class"
  style="color: purple"
  title="learn vue"
  v-bind="$attrs"
  v-on="$listeners"
  name="cjz"
/>
```

孙子组件添加自定义事件

```js
methods: {
      clickChild() {
        this.$emit('testChangName','clggggg')
      }
    },
```

#### 自定义事件

#### 插槽

##### 编译作用域

- 父级模板里的内容都是在父级作用域中编译的；子模版里的所有内容都是在子作用域中编译的。

##### 后备内容

- 有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。

##### 具名插槽

- <slot> 元素有一个特殊的 attribute：name

```html
<slot name="header"></slot>
```

- 一个不带 name 的<slot>出口会带有隐含的名字"fefault"
- 在向具名插槽提供内容的时候，我们可以在一个<template>元素上使用 v-slot 指令。并以 v-slot 的参数的形式提供其名称。

```html
<template v-slot:header> </template>
```

**注意**：v-slot 只能添加在<template>上（只有一种例外情况）

##### 作用域插槽

- 有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 `<current-user>` 组件：

```html
<span>
  <slot>{{username.lastName}}</slot>
</span>

//我们可能想换掉备用内容，用名而非姓来显示。如下
<current-user> {{user.firstName}} </current-user>
```

**然而上述代码不会正常工作，因为只有<current-user>组件可以访问到 user，而我们提供的内容是在父级渲染的。**

```html
//为了让user在父级的插槽内容中可用，我们可以将user作为slot元素的一个attribute绑定上去：
<span>
  <slot :user="user"> {{user.lastName}} </slot>
</span>
```

- 绑定在<slot>元素上的 attribute 被称为==插槽 prop==。现在父级作用域中，我们可以使用带值得 v-slot 来定义我们提供的插槽 prop 的名字

```html
<current-user>
  <template> {{slotProps.user.firstName}} </template>
</current-user>
```

\*\*在这个例子中，我们将==包含所有插槽 prop 的对象命名为 slotProps==，但你也可以使用任意你喜欢的名字。

##### 独占默认插槽的缩写语法

在上述情况下，当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板使用。这样我们就可以把 v-slot 直接用在组件上：

```html
//因为<current-user
  >组件里面，只有默认插槽，没有其他插槽。可以不用<template
    >包裹，直接把v-slot写在组件上
    <current-user v-slot:default="slotProps">
      {{slotProps.user.firstName}}
    </current-user>

    //这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的v-slot被假定对应默认插槽
    <current-user> {{slotProps.user.firstName}} </current-user></template
  ></current-user
>
```

**注意**：默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确：

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

只要出现多个插槽，请始终为所有插槽使用完整的基于<template>的语法。

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps"> ... </template>
</current-user>
```

##### 解构插槽 Prop

- 作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里：

```js
function (slotProps) {
//插槽内容
}
```

- 这意味着 v-slot 的值实际上可以是任何能够作为函数定义中的参数 JavaScript 表达式。
- 1. 使用 ES6 解构来传入具体的插槽 prop：

```html
<current-user v-slot="{user}"> {{user.firstName}} </current-user>
```

- 2. 将 user 重命名为 person

```html
<current-user v-slot="{user: person}"> {{person.firstName}} </current-user>
```

- 3. 可以定义后备内容

```html
<current-user v-slot="{user = {firstName: 'Guest'}}">
  {{user.firstName}}
</current-user>
```

##### 动态插槽名

##### 具名插槽的缩写

**例如**：v-slot: header 缩写为#

即，v-slot: header 可以缩写为#header

**注意**：和其他指令一样，该缩写只有在其有参数的时候才可用。如果你希望使用缩写的话，必须以明确的插槽名取而代之

```html
<current-user #default="{ user }"> {{ user.firstName }} </current-user>
```

**插槽 prop 允许我们将插槽转换为可复用的模板，这些模板可以基于输入的 prop 渲染出不同的内容。**

#### 动态组件

#### 异步组件

### Vue Router

通过注入路由器，

我们可以在任何组件内通过 this.$router 访问路由器，

通过 this.$toute 访问当前路由

- this.$router:访问路由器
- this.$route：访问当前路由

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 user 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染，那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”

```js
//动态路径参数，以冒号开头

routes: [{ path: '/user/:id', component: User }]

//现在呢，像/user/foo和/user/bar都将映射到相同的路由。
```

- 一个“路径参数”使用冒号`:`标记。当匹配到一个路由时，参数值就会被设置到`this.$route.params`,以在每个组件内使用。于是，我们可以更新`User`的模板，输出当前用户的 ID。
- 可以在一个路由中设置多段“路径参数”，对应的值都会设置到`$route.params`中。

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

##### 相应路由参数的的变化

例如从`/user/foo`导航到`/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**

复用组件时，想要对路由参数的变化作出响应的话，你可以简单地 watch（检测变化）`$route`对象。

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    },
  },
}
```

或者使用`beforeRouteUpdate`导航守卫

```js
const User = {
  template: '...',
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  },
}
```

##### 捕获所有路由或 404 Not found 路由

常规参数只会匹配被`/`分隔的 URL 片段中的字符。如果相匹配**任意路径**，我们可以使用通配符(`*`):

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

**注意**：当使用通配符路由时，请确保路由的顺序是正确的，也就是说含有通配符的路由应该放在最后。

- 路由 `{ path: '*' }` 通常用于客户端 404 错误。

当使用一个通配符时，`$route.params`内会自动添加一个名为`pathMath`参数。它包含了 URL 通过通配符被匹配的部分。

```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

##### 匹配优先级

有时候同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

##### 编程式的导航

**path**的形式

`this.$router.push({path:'/user'})`

带有参数的`this.$router.push({path: '/user/1'})`

**name**的形式

`this.$router.push({name: 'user',params: {id: 1}})`

this.$router 访问路由实例，因此可以使用

**this.$router.push**

`this.$router.go(1)`，在浏览器记录中前进一步，等同于`history.foward()`

`this.$router.go(-1)`，后台退一步记录，等同于`history.back()`

VueRouter 的导航方法（`push`、`replace`、`go`）在各类路由模式（`history`、`hash`、和`abstract`）下表现一致。

**重定向和别名**

redirect

alias

##### **路由组件传参**

在组件中使用`$route`会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

使用 props 将组件和路由解耦

**取代与`$router`的耦合**

**通过`props`解耦**

```js
 {
    path: '/props/:id',
    component: Props,
    props: true
  },


   // 在相应组件中
   props: ['id'],


   //应用
   <template>
    <div class="">
      <h2>使用路由解耦方式</h2>
      <h3>{{id}}</h3>
    </div>
   </template>
```

**注意**：对于包含命名使徒的路由，你必须为每个命名视图添加`props` 选项。

**布尔模式：**

如果`props`被设置为`true`，`route.params`将会被设置为组件属性。

**对象模式：**

**函数模式：**

##### html5 history 模式

`vue-router`默认 hash 模式——使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的**history 模式**

##### 导航守卫

`vue-router`提供的导航守卫主要用来通过跳转或取消的方式守卫导航。

有多种机会植入路由导航过程中：全局的、单个路由独享的、或者组件的。

to,from 是一个对象，就是 routes[]数组里面配置的某个具体的路由对象。比如：to.path, to.name, to.meta

**全局前置守卫**

`router,beforeEach`注册一个全局前置守卫。

**全局解析守卫**

`router.beforeResolve`注册一个全局守卫。这和`router,beforeEach`类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

**全局后置钩子**

```js
router.afterEach((to, from) => {
  // ...
})
```

**路由独享的守卫**

可以在路由配置上直接定义`beforeEnter`守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      },
    },
  ],
})
```

##### 路由元信息

定义路由的时候可以配置`meta`字段。

一个路由匹配到的所有路有记录会暴露为`$route`对象的`$route.matched`数组。因此我们需要遍历`$route.matched`来检查路由记录中的`meta`字段。

### Vuex

vuex 允许我们在 store 中定义 getter，（可以认为是 store 的计算属性）就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖发生了改变才会被重新计算。

#### Getters

Getter 接受 state 作为第一个参数

- 通过属性访问，Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值。

  - **注意**：getter 再通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。

- Getter 也可以接受其他 getter 作为第二个参数。

- 也可以通过让 getter 返回一个函数，来实现 getter 传参。在对 store 里的数组进行查询时非常有用。
  - **注意**：getter 再通过方法访问时，每次都会去进行调用，而不会缓存结果。

**mapGetters**辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

**forEach 没有返回值！！！**

#### Mutations

- 既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。

- 这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项

  - 最好提前在你的 store 中初始化好所有所需属性。

  - 当需要在对象上添加新属性时，你应该

    - 使用 `Vue.set(obj, 'newProp', 123)`, 或者

    - 以新对象替换老对象。例如，利用[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写：

      ```js
      state.obj = { ...state.obj, newProp: 123 }
      ```

- 使用常量替代 Mutation 事件类型

- Mutation 必须是同步函数
- `mutation` 接收参数必须只能两个，超出的都无法获取；第二个参数推荐传递的是一个对象，来接收更多的信息。

#### Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态
- Action 可以包含任意异步操作。

**注意**：Action 接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters

- **组合 Action**

首先，需要明白，`store.dispatch`可以处理被触发的 action 的处理函数返回的 Promise ，并且 `store.dispatch` 仍旧返回 Promise：

#### Module

vuex 允许我们将 store 分割成模块，每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块—从上至下进行同样的分割。

- 对于模块内部的 mutation 和 getter，接收的第一份参数是模块的局部状态对象

- 同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState:

#### Vue3 和 ts

ts 是 JavaScript 的超集，最终将会被编译为 js

安装 ts

```
npm i -g typescript
tsc -v
```
