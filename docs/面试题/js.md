### bind call apply
1. 手写bind call apply
bind：
```js
Function.prototype._bind = function(context, ...args) {
    return (...newArgs) => {
        this.call(context, ...args, ...newArgs)
    }
}
```
2. bind怎么使用，连续多个bind，this指向什么

this指向第一个bind传入的对象
```js
let a = 'a-window'
const o1 = {
    a: 'a-o1'
}
const o2 = {
    a: 'a-o2'
}
function test() {
    console.log(this.a)
}
test.bind()  // 返回一个this固定的函数
test() // undefined
test.bind()() // undefined
test.bind(o1)() //  a-o1
test.bind(o1).bind(o2)() // a-o1
test.bind().bind(o2)() // undefined
```
### for...in和for...of的区别
两者都是用来遍历的
for...in会遍历数组所有的可枚举属性，包括原型。主要用于遍历对象的键值
for...of来遍历有迭代器方法的值，遍历拿到的的是集合值
### ==和===
==会强制类型转换，并且比较不同类型的操作数
相等运算符(==和!=)使用**抽象相等比较算**法比较两个操作数。
+ 如果两个操作数都是对象，则仅当两个对象都引用到同一个对象上时才返回true
+ 如果一个操作数是null，另一个操作数是undefined，则返回true。比较相等性之前，不能将null和undefined转换成其他任何值
+ 如果两个操作数是不同类型的，就会尝试在比较前将他们转为成相同类型
  + 如果是数字与字符串比较，就会尝试将字符串转为数字值
  + 如果操作数之一是boolean值，则将操作转为1或者0
  + 如果操作数之一是对象，另一个是字符串或者数字，会尝试使用对象的valueOf和toString方法将对象转为原始值。

```js
null == undefined // true
1 == '1' // true
'1' == 1 // true
0 == false // true
0 == null // false
0 == undefined //false

const str1 = 'hello'
const str2 = new String('hello') 
str1 == str2 // true
```
**注意**
```js
+0 == -0 // true
true == true // true
false == false // true

// 如果任一操作数为NaN则返回false
'aaa' == NaN // false
```
`===`严格等于运算符不进行类型转换

### `[] == ![]`和`[] == []`的值
1. !运算符的优先级大于 `==`， ！会将后面的值转化为布尔值即`![] 变成 !Boolean([])`，也就是`!true`，也就是false. 
2. 实际上是对比`[] == false`
运算上面的顺序，false是布尔值，所以转化为数值`Number(false)`为0.
3. 对比`[] == 0`
满足第三条规则，`[]`是对象（数组也属于对象），0不是对象。所以`ToPrimitive`([])是`""`
4. 对比`"" == 0`
满足第二条规则，`""`是字符串，0是数值，对比`Number(0) == 0`，也就是 `0 == 0`
所以得出`[] == ![]`

```js
![] == false
[] == false // true
[] == true // false
[] == 0 // true
({} == 0) //  false
// 1
if ([]) {
    console.log(1)
} else {
    console.log(2)
} 

// 3
if({}) {
    console.log(3)
} else {
    console.log(4)
}

// 5
if([] == false) {
    console.log(5)
} else {
    console.log(6)
}

// 8
if({} == false) {
    console.log(7)
} esle {
    console.log(8)
}
```
### []+0, {}+0
```js
[]+0 // '0'
{}+0 // NaN
```
### js原型链
1. 比如我们声明一个`Animal`构造函数
2. 就会生成一个`Animal.prototype`的原型对象
3. 通过`new Animal`生成一个Animal的实例，此时该实例的`__proto__`属性指向`Animal.prototype`
4. `Animal.prototype`又指向`Object.prototype` 
### js模块化
common.js 和 es6 module的区别
+ CommonJS模块输出的是一个值的拷贝，ES6 模块输出的是值的引用；
+ CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
CJS模块会被整体导入，而 MJS可以被部分导入。因此使用 MJS可以 tree shaking。
import命令会在其他所有代码执行前就被JavaScript引擎静态分析，可以说它是在编译时加载模块。
所以我们通常只能把 import放在模块的顶层，并且不能放在如 if之类的代码块中。
并且由于这个特性，我们不能在JS代码执行中根据条件来动态加载模块，而 require可以做到这一点，require是运行时加载模块。
好在，我们可以使用 import()来实现运行时加载模块，组件的懒加载通常就是使用 import()搭配代码分割来实现的。

### Promise
1. Promise值穿透
then的链式调用：用 Promise 的时候，当 then 函数中 return 了一个值，不管是什么值，我们都能在下一个 then 中获取到，这就是所谓的then 的链式调用。
then和catch参数期望值是函数，当不是函数时，会出现值穿透，也就是会保存上一个promise.data,每次无效的then所返回的promise状态都为resolved
```js
new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello')
        }, 1000)
}).then(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
// Promise {<pending>}
// hello
```
1. Promise的基本特征
promise有三个基本特征：pending，fulfilled，rejected
promise 的默认状态是 pending；
promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected
2. 如何中断一个Promise
返回一个新的promise，并且处于pendding状态
```js
Promise.resolve().then(() => {
    console.log('then 1')
    return new Promise(() => {})
}).then(() => {
     console.log('then 2')   
}).then(() => {
     console.log('then 3')   
}).catch((err) => {
     console.log(err)   
})
// then 1

```

3. 手写Promise.all Promise.race Promise.finally


4. 对Promise的理解，与async、await的区别，async、await是怎么实现的

### Es6
1. 解构赋值，如果没有找到，会返回什么

2. 箭头函数与普通函数区别

3. es6新特性有哪些，组合式API

4. 