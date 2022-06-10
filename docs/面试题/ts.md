### ts中，any和unknow分别是什么意思，泛型怎么使用
unknow表示某个变量的类型是未知的，也意味着这个变量可能是任意类型的值,unknow可以保证类型安全，any没有类型检查
any 类型，则允许被赋值为任意类型。
unknow类似于any类型，但是更安全
任何类型都可以赋值给unknow类型，但是unknow类型只能赋值给unknow和any
```ts
let u1: unknown = '1'
let u2: unknown = 3
let u3: any
u1 = u2
u3 = u2

let u4: string = 'hello'
u4 = h2 // 报错
```
### keyof使用

### 使用TypeScript 实现一个 get 函数来获取它的属性值
```js
const data = {  name: 'tom',  age: 18，  address: xxx }
```
```ts
const get = <T extends object, K extends keyof T>(o: T, k: K) : T[K] => {
  return o[k]
}
```