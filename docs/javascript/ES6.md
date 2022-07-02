## let/const
1. 不存在变量提升
2. 暂时性死区
3. 不能重复声明
## 模板字符串
```js
const name = 'cpp'
console.log(`他的名字叫${name}`)
// 他的名字叫cp
```
## Promise

**1. Promise为我们解决了什么问题**

在传统的异步编程中，如果异步之间存在依赖关系，就需要通过层层嵌套回调的方式满足这种依赖，如果嵌套层数过多，可读性和可以维护性都会变得很差，产生所谓的“回调地狱”，而 Promise 将嵌套调用改为链式调用，增加了可阅读性和可维护性。也就是说，Promise 解决的是异步编码风格的问题。

### Promise实现

#### 基础雏形

```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class Promise {
    // 初始化状态
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined

        let resolve = (value) => {
            if(this.state === PENDING) {
                this.state = FULLFILLED
                this.value = value
            }
        }
        let reject = (reason) => {
            if(this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
            }
        }

        try {
            executor(resolve, reject)
        } catch(err) {
            reject(err)
        }
        
    }
    then(onFullfilled, onRejected) {
        if(this.state === FULLFILLED) {
            onFullfilled(this.value)
        }
        if(this.state === REJECTED) {
            onRejected(this.reason)
        }
    }
}

// 测试异步没有反应
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(333)
    }, 3000)
}).then((value) => {
     cosnole.log(value)   
})
```

#### 解决异步实现

```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class Promise {
    // 初始化状态
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            if(this.state === PENDING) {
                this.state = FULLFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if(this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch(err) {
            reject(err)
        }
        
    }
    then(onFullfilled, onRejected) {
        if(this.state === FULLFILLED) {
            onFullfilled(this.value)
        }
        if(this.state === REJECTED) {
            onRejected(this.reason)
        }

        if(this.state === PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFullfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(333)
    }, 3000)
}).then(value => {
     console.log(value)   
})

// 333
```



#### 解决链式调用

1. (then中传递的函数)判断成功和失败函数的返回结果
2. 判断是不是promise，如果是promise，就采用它的状态。
3. 如果不是promise直接将结果传递下去即可

**考虑几种情况**

+ 情况一： then里面的是一个promise或者值

```js
const promise = new Promise((resolve, reject) => {
     setTimeout(() => {
         resolve(333)
     }, 3000)   
})

let x = promise.then((value) => {
     return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve([value, 222])
          }, 2000)   
     })   
})
x.then(value => {
     console.log(value)  
})
```

**实现**

```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function resolvePromise(x, promise2, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(typeof x === 'object' && x !== null || typeof x === 'function') {
        try {
            // Let then be x.then
            let then = x.then
            if(typeof then === 'function') {  // 如果x.then为一个函数，认为x为一个promise
                // first argument resolvePromise, and second argument rejectPromise
                // 第一个参数为成功的promise，y => {} 第二个参数为失败的promise  r => {}
                 then.call(x, y => {
                    resolve(y) // 采用promise的成功结果，将值向下传递
                 }, r => {
                    reject(r)  // 采用失败结果向下传递
                 })
            } else {
                // 说明x是一个普通的对象
                resolve(x)
            }
        } catch (err) {
            reject(err)
        }
    } else {
        // 说明x是一个普通的值
        resolve(x)
    }
}
// 解决链式调用
class Promise {
    // 初始化状态
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            if(this.state === PENDING) {
                this.state = FULLFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if(this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch(err) {
            reject(err)
        }
        
    }
    then(onFullfilled, onRejected) {
        let promise2 =  new Promise((resolve, reject) => {
            if(this.state === FULLFILLED) {
                setTimeout(() => {
                    let x = onFullfilled(this.value)
                    resolvePromise(x, promise2, resolve, reject)  
                }, 0)
            }
            if(this.state === REJECTED) {
                setTimeout(() => {
                    let x = onRejected(this.reason)
                    resolvePromise(x, promise2, resolve, reject)
                }, 0)
            }
    
            if(this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onFullfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)  
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    }, 0)
                })
            }
        })
        return promise2
    }
}

const p = new Promise((resolve, reject) => {
    resolve(100)
})
const promise2 = p.then((value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([value, 'hello'])
        }, 3000)
    })
})
promise2.then(value => {
    console.log(value)
})
```

+ 情况二：then里面的返回的Promise对象resolve了一个Promise的情况下

应该将then里面返回的Promise对象resolve的值传递给下一个then

```js
// then里面的返回的Promise对象resolve了一个Promise的时候
const p3 = new Promise((resolve, reject) => {
    resolve(200)
})
const promise3 = p3.then((value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject) => {
                resolve([value, 'hello'])
            }))
        }, 3000)
    })
})
promise3.then(value => {
    console.log(value)
})
```

**实现**

```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function resolvePromise(x, promise2, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(typeof x === 'object' && x !== null || typeof x === 'function') {
        try {
            // Let then be x.then
            let then = x.then
            if(typeof then === 'function') {  // 如果x.then为一个函数，认为x为一个promise
                // first argument resolvePromise, and second argument rejectPromise
                // 第一个参数为成功的promise，y => {} 第二个参数为失败的promise  r => {}
                 then.call(x, y => { // 这里的y可能还是一个Promise,递归知道解析出来的结果是一个普通值为止
                    resolvePromise(y, promise2, resolve, reject) // 采用promise的成功结果，将值向下传递
                 }, r => {
                    reject(r)  // 采用失败结果向下传递
                 })
            } else {
                // 说明x是一个普通的对象
                resolve(x)
            }
        } catch (err) {
            reject(err)
        }
    } else {
        // 说明x是一个普通的值
        resolve(x)
    }
}
// 解决链式调用, resolve一个promise的时候
class Promise {
    // 初始化状态
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            if(this.state === PENDING) {
                this.state = FULLFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if(this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch(err) {
            reject(err)
        }
        
    }
    then(onFullfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            if(this.state === FULLFILLED) {
                setTimeout(() => {
                    let x = onFullfilled(this.value)
                    resolvePromise(x, promise2, resolve, reject)  
                }, 0)
            }
            if(this.state === REJECTED) {
                setTimeout(() => {
                    let x = onRejected(this.reason)
                    resolvePromise(x, promise2, resolve, reject)
                }, 0)
            }
    
            if(this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onFullfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)  
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    }, 0)
                })
            }
        })
        return promise2
    }
}

const p3 = new Promise((resolve, reject) => {
    resolve(200)
})
const promise3 = p3.then((value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject) => {
                resolve([value, 'hello'])
            }))
        }, 3000)
    })
})
promise3.then(value => {
    console.log(value)
})
```

+ 情况三：直接resolve一个Promise的时候

```js
// 直接resolve一个Promise的时候
// resolve一个Promise的时候，应该将这个Promise resolve的值传递给then
const p = new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
        resolve(200)
    }))
})
const promise = p.then((value) => {
    console.log(value)
})
```

**实现**

```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

function resolvePromise(x, promise2, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(typeof x === 'object' && x !== null || typeof x === 'function') {
        let called
        try {
            // Let then be x.then
            let then = x.then
            if(typeof then === 'function') {  // 如果x.then为一个函数，认为x为一个promise
                // first argument resolvePromise, and second argument rejectPromise
                // 第一个参数为成功的promise，y => {} 第二个参数为失败的promise  r => {}
                 then.call(x, y => { // 这里的y可能还是一个Promise,递归知道解析出来的结果是一个普通值为止
                    if(!called) called = true
                    resolvePromise(y, promise2, resolve, reject) // 采用promise的成功结果，将值向下传递
                 }, r => {
                    if(!called) called = true
                    reject(r)  // 采用失败结果向下传递
                 })
            } else {
                // 说明x是一个普通的对象
                resolve(x)
            }
        } catch (err) {
            if(!called) called = true
            reject(err)
        }
    } else {
        // 说明x是一个普通的值
        resolve(x)
    }
}
// 解决链式调用, resolve一个promise的时候
class Promise {
    // 初始化状态
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            if(this.state === PENDING) {
                if(value instanceof Promise) {
                    value.then(value => {
                        resolve(value)
                    }, err => {
                        reject(err)
                    })
                } else {
                    this.state = FULLFILLED
                    this.value = value
                    this.onResolvedCallbacks.forEach(fn => fn())
                }
                
            }
        }
        let reject = (reason) => {
            if(this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch(err) {
            reject(err)
        }
        
    }
    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

        let promise2 = new Promise((resolve, reject) => {
            if(this.state === FULLFILLED) {
                setTimeout(() => {
                    let x = onFullfilled(this.value)
                    resolvePromise(x, promise2, resolve, reject)  
                }, 0)
            }
            if(this.state === REJECTED) {
                setTimeout(() => {
                    let x = onRejected(this.reason)
                    resolvePromise(x, promise2, resolve, reject)
                }, 0)
            }
    
            if(this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onFullfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)  
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    }, 0)
                })
            }
        })
        return promise2
    }
}
// resolve一个Promise的时候，应该将这个Promise resolve的值传递给then
// const p = new Promise((resolve, reject) => {
//     resolve(new Promise((resolve, reject) => {
//         resolve(200)
//     }))
// })
// p.then(value => {
//     console.log(111)
// })

// const promise2 = p.then((value) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve([value, 'hello'])
//         }, 3000)
//     })
// })
// promise2.then(value => {
//     console.log(value)
// })

const p = new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
        resolve(200)
    }))
})
const promise = p.then((value) => {
    console.log(value)
})

const p3 = new Promise((resolve, reject) => {
    resolve(200)
})
const promise3 = p3.then((value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject) => {
                resolve([value, 'hello'])
            }))
        }, 3000)
    })
})
promise3.then(value => {
    console.log(value)
})
```

### Promise测试

**添加代码**：在我们实现的Promise里面添加

```js
Promise.defer = Promise.deferred = function() {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise
```



**安装**

```bash
git add promises-aplus-tests -D
```

**package.json**

```json
{
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests 4.js"
  }
}
```

```bash
# 执行
yarn test
```



### Promise.all实现
```js
Promise._all = function(pArr) {
    return new Promise((resolve, reject) => {
        let len = pArr.length
        let count = 0
        let result = []
    
        pArr.forEach((promise, index) => {
            promise.then(value => {
                result[index] = value
                count++
                if(count === len) {
                    resolve(result)
                }
            }).catch(err => {
                reject(err)   
            })
        })
    })
}
```
### Promise.race实现
```js
Promise._race = function(pArr) {
    return new Promise((resolve, reject) => {
        pArr.forEach(promise => {
             promise.then(value => {
                 resolve(value)   
             }).catch(err => {
                  reject(err)   
             })   
        })
    })
}
```
## async/await 


## class
class中的箭头函数
```js
class People {
    name = 'cpp'
    age = 22

    getNameA = () => {
        console.log(this)
        return this.name
    }

    getNameB() { 
        console.log(this)
        return this.name
    }
}
const p = new People('cjz', 24)
p.getNameA()  //  输出的this为实例p
p.getNameB()
```
**注意点**:
1. `getNameA`是实例上的方法
2. `getNameB`是原型对象上的方法

## Generator生成器

### 概念

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了**状态机**，还是一个**遍历器对象生成函数**。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator函数是一个普通函数，但是有两个特征

+ `function`关键字与函数名之间有个星号`*`。
+ 函数体内部使用`yield`表达式，定义不同的内部状态。

```js
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending'
}

const hw = helloWorldGenerator()

hw.next()
// {value: 'hello', done: false}
hw.next()
// {value: 'world', done: false}
hw.next()
// {value: 'ending', done: true}
hw.next()
// {value: undefined, done: true}
```

**总结**

调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的`next`方法，就会返回一个有着`value`和`done`两个属性的对象。

+ `value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；
+ `done`属性是一个布尔值，表示是否遍历结束。

### yield表达式

由于Generator函数返回的遍历器对象，只有调用`next`方法才能遍历下一个内部状态，所以其实提供了一种可以暂停执行的的函数，**`yield`表达式就是暂停标志**

1. 遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为内部对象的`value`属性值。
2. 下一次调用`next`方法时，再继续往下执行。直到遇到下一个`yield`表达式。
3. 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止。并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
4. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`

**注意**：

+ `yield`表达式只能用在Generator里面
+ `yield`表达式如果要用在另一个表达式之中，必须放在圆括号里面

**案例一**

```js
function* printHelloWorld() {
   console.log('hello' + (yield 'world'))
}
const phw = printHelloWorld()
phw.next()
// {value: 'world', done: false}
phw.next()
// helloundefined
// {value: undefined, done: true}
```

**案例二**

```js
function* helloWorld() {
   yield ('hello' + (yield 'world'))
}
const hw = helloWorld()
hw.next()
// {value: 'world', done: false}
hw.next()
// {value: 'helloundefined', done: false}
hw.next()
// {value: undefined, done: true}
```



+ `yield`表达式用作函数参数或者放在赋值语句的右边，可以不加括号

```js
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
function* foo(a, b) {
    a;
    b;
}
const d = demo()

d.next()
// {value: 'a', done: false}
d.next()
// {value: 'b', done: false}
d.next()
// {value: undefined, done: false}
```

+ 在一个Generator函数中调用另一个Generator函数

```js
function* collect() {
    yield 1
    yield 2
    yield 3
    yield* collect2()
}
function* collect2() {
    yield 4
    yield 5
}

const c = collect()
c.next()
// {value: 1, done: false}
c.next()
// {value: 2, done: false}
c.next()
// {value: 3, done: false}
c.next()
// {value: 4, done: false}
c.next()
// {value: 5, done: false}
c.next()
// {value: undefined, done: true}
```

+ Generator函数与递归

```js
// 将树结构转为数组
const tree = {
  "id": 3,
  "text": "第三条",
  "children": [
      {
          "id": 2,
          "text": "第二条",
          "parent": 3
      },
      {
          "id": 1,
          "text": "第一条",
          "parent": 3,
          "children": [
              {
                  "id": 5,
                  "text": "第五条",
                  "parent": 1,
              }
          ]
      }
  ]
}


```



### 与Iterator接口的关系

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

**所以可以直接用`for of`还有`...`运算符遍历**，因为`for...of`循环，扩展运算符（`...`）、解构赋值和`Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

```js
function* helloWorld() {
    yield 'hello'
    yield 'world'
}
// ... 扩展运算符
[...helloWorld()]
// ['hello', 'world']

// for...of
for(const i of helloWorld()) {
    console.log(i)
}
// hello
// world

// Array.from()
Array.from(helloWorld())
// ['hello', 'world']

// 解构赋值
const [x, y] = helloWorld()
x // 'hello'
y // 'world'
```

#### for...of循环

**1. 自动遍历Generator函数运行返回的Iterator对象**

`for...of`循环可以自动遍历Generator函数运行时生成的`Iterator`对象，且此时不再需要调用`next`方法

```js
function* foo() {
    yield 1
    yield 2
    yield 3
    return 4
}
for(const i of foo()) {
    console.log(i)
}
// 1
// 2
// 3
```

**注意**：

一旦`next`方法的返回对象的`done`属性为`true`，`for...of`循环就会中止，且不包含该返回对象，所以上面代码的`return`语句返回的`4，不包括在`for...of`循环之中。

**2. 原生对象不具备Iterator接口**

因此，原生对象不能通过`for...of`遍历，我们可以通过使用Generator函数为原生对象加上Iterator接口，就可以使用`for...of`遍历了

```js
// 声明一个对象obj
const obj = {
    name: 'cpp',
    age: 22
}
// 声明一个Generator函数objectEntries作为遍历器接口
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

// 将该遍历器接口赋值给obj[Symbol.iterator]
obj[Symbol.iterator] = objectEntries
// 通过for...of遍历obj
for(const [key, value] of obj) {
    console.log(key, value)
}
// name cpp
// age 22
```



### Generator函数方法

#### 1. Generator.prototype.next()

**next方法的参数**

`yield`表达式本身没有返回值，或者说返回值永远都是`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回

#### 2. Generator.prototype.throw()

Generator函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。

**案例一**

```js
function* g() {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

**案例二**

```js
var g = function* () {
  try {
    yield 1;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();
i.next()

try {
  i.throw('a');
  i.throw('b');
  i.throw('c')
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a
```

+ `throw`方法可以接受一个参数，该参数会被`catch`语句接收，建议抛出`Error`对象的实例。

```js
function* g() {
    try {
        yield 
    } catch(err) {
        console.log(err)
    }
}
const i = g()

i.next()
// {value: undefined, done: false}
i.throw(new Error('出错了！'))
VM8093:5 Error: 出错了！
    at <anonymous>:1:9
// {value: undefined, done: true}
```

**注意**

不要将`Generator.prototype.throw()`方法和全局的`throw`方法混淆。全局的`throw`抛出的错误，只能被函数体外的`catch`捕获。

如果Generator函数体内部没有部署`try...catch`代码块，那么Generator函数的`throw`方法抛出的错误会被外部的`try...catch`代码块捕获

#### 3. Generator.prototype.return()

Generator函数返回的遍历器对象的`return()`方法，可以返回给定的值，并且终结遍历Generator函数

```js
function* gen() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}
const g = gen()
g.next()
// {value: 1, done: false}
g.next()
// {value: 2, done: false}
g.return('test')
// {value: 'test', done: true}
g.next()
// {value: undefined, done: true}
```

### Generator函数的异步应用

**ES6出现以前异步编程的方法，大概有四种**

- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象

#### 异步任务的封装

```js
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

// 执行
var g = gen();
var result = g.next();

// fetch模块返回一个promise
result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```

#### co模块

用于Generator函数的自动执行

```js
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

co 模块可以让你不用编写 Generator 函数的执行器。

```js
var co = require('co');
co(gen);
```

+ Generator 函数只要传入`co`函数，就会自动执行

+ `co`函数返回一个`Promise`对象

##### co模块的执行原理

Generator就是一个异步操作的容器。它的自动执行需要一种机制，当有了结果，能够自动教回执行。

两种方法可以做到这一点

1. **回调函数：**将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。

2. Promise对象，将异步操作包装成 Promise 对象，用`then`方法交回执行权。

#### 基于Promise对象的自动执行



## async/await

async函数就是Generator函数的语法糖

`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，

**`async`函数对Generator函数的改进：**

+ 内置执行器
+ 更好的语义
+ 更广的适用性
+ 返回值是Promise：async函数的返回值是Promise对象

