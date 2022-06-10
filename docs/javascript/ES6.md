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