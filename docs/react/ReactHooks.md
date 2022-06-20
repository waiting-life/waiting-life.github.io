## React函数式组件
在函数组件中，没有一个状态去保存这些状态，每一次函数上下文执行，所有变量，常量都重新声明，执行完毕，再被垃圾机制回收
## hook执行原理
:::info
组件创建的时候会有一块关联的线性存储单元（本质上是链表存储memorizedState：以链表的形式存放hooks信息）。那么每次执行渲染函数的时候，根据Hook在函数中出现的位置，这个Hook都有权访问（读与写）线性存储单元中对应位置中的数据，这也是为什么我们强制要求每次执行函数时Hook出现的顺序都必须一致。
:::
react当数据改变的时候就会重新渲染，调用组件函数，
memoizedState：
useState中 保存 state 信息 
useEffect 中 保存着 effect 对象 
useMemo 中 保存的是缓存的值和 deps 
useRef 中保存的是 ref 对象。
### 问题
1. 多个react-hooks用什么来记录每一个hooks的顺序的 ？ 换个问法！为什么不能条件语句中，声明hooks? hooks声明为什么在组件的最顶部？
因为一旦在条件语句中声明`hooks`，在下一次函数组件更新后，`hooks`链表结构将会被破坏，就会发生异常。


```tsx
// hooks链表
// [0,  { current: 0 }, [0], [fn, 'xx']]
const Test = () => { 
  //所以不能在条件判断里面写hook
  const [count, setCount] = useState(0)   

  const myRef = useRef(count)
  myRef.current = count

  useEffect(() => {
    setTimeout(() => {
      console.log(count)
    }, 3000);
  }, [count])

  const fn = useCallback(() => {
    console.log(myRef.current)
  }, [])

  const handleCount = () => {
    setCount(count+10)
  }
  return (
    <div>
      <div>{count}</div>
      <Button onClick={handleCount} type="primary">点击</Button>
    </div>
  )
}
```

## useState
### 练习一
```tsx
const Test = () => { 
  const [count, setCount] = useState(0)    

  useEffect(() => {
    setTimeout(() => {
      console.log(count)
    }, 3000);
  }, [count])

  return (
    <div>
      <div>count:{count}</div>
      <Button onClick={() => setCount(count => count+1)} type="primary">点击count+1</Button>
    </div>
  )
}
export default Test
```
### 练习二
```tsx
// [1]
const Test = () => {
  const [id, setId] = useState(1)
  // 当Child组件的key修改的时候，Child组件会被销毁重新生成
  return (
    <div>
        <Child key={id} />  
        <Button onClick={() => setId(2)}>更新key</Button>
    </div>
  )
}

export default Test

// [100]
function Child() {
  const [count, setCount] = useState(100)

  return <div>
    {count}
    <Button onClick={() => setCount(count => count + 100)}>点击</Button>
    </div>
}
```

## useEffect
与componentDisMount和componentDisUpdate不同的是，传给useEffect的函数会在浏览器完成布局与绘制之后，在一个延迟时间中被调用。

可以通过useEffec来实现一些生命周期的功能，组件挂在，组件更新，组件卸载

### 练习一
```tsx
export default function UseEffectCom() {
  const [count, setCount] = useState(0)
  const [person, setPerson] = useState({name: 'cpp', age: 22})
  // 1. 不传第二个参数，每次数据修改重新渲染的时候，useEffect都会调用传的函数
  // 2. 传入第二个数组包含依赖的数组，useEffect会根据对应依赖的变化来调用函数
  // 3. 当传入[]的时候，只有在第一次组件渲染时会调用函数
  useEffect(() => {
    console.log(`count: -------${count}`)
    console.log(`person: --------${person}`)
  }, [])
  return (
    <div>
      <Button onClick={() => setCount(count => count+1)}>点击+1</Button>
      <Button onClick={() => setPerson({name: 'cjz', age: 24})}>修改信息</Button>
    </div>
  )
}
```
### 练习二
```tsx
export default function UseEffectCom() {
  const [count, setCount] = useState(0)
  const [person, setPerson] = useState({name: 'cpp', age: 22})
  useEffect(() => {
    console.log(`count: -------${count}`)
    console.log(`person: --------${person}`)
    let timer = setTimeout(() => {
      console.log(count, '?????')
    }, 500);
    // 在组建卸载之前处理一些操作
    return () => {
      clearTimeout(timer)
    }
  }, [count])
  return (
    <div>
      <Button onClick={() => setCount(count => count+1)}>点击+1</Button>
      <Button onClick={() => setPerson({name: 'cjz', age: 24})}>修改信息</Button>
    </div>
  )
}

```
### 练习三
组件卸载前
```tsx
export default function UseEffectCom() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let timer = setTimeout(() => {
      console.log(count, '?????')
    }, 4000);
    // 在组建卸载之前处理一些操作
    return () => {
      clearTimeout(timer)
    }
  }, [])  // 模拟组件卸载前，这里应为[]
  return (
    <div>
      <Button onClick={() => setCount(count => count+1)}>点击+1</Button>
    </div>
  )
}
```
## useRef
1. 不同函数作用域可以引用到同一个值，又不希望这个值的更新触发渲染，这个时候就可以使用useRef
```tsx
const Test = () => { 
  const [count, setCount] = useState(0)    
  // 不同函数作用域可以引用到同一个值，又不希望这个值的更新触发渲染，这个时候就可以使用useRef
  const myRef = useRef(count)
  myRef.current = count

  useEffect(() => {
    setTimeout(() => {
      console.log(count)
      // myRef.current的修改不会触发组件重新渲染
      console.log(myRef.current)
    }, 3000);
  }, [count])

  return (
    <div>
      <div>count:{count}</div>
      <div>将count赋值给ref.current: {myRef.current}</div>
      <Button onClick={() => setCount(count => count+1)} type="primary">点击count+1</Button>
      <Button onClick={() => myRef.current+=1 } type="primary">点击ref.current+1</Button>
    </div>
  )
}
export default Test
```

2. useRef还可以用来记录DOM节点的引用
```tsx
import { useRef } from "react"
export default function UseRefCom() {
  const ref = useRef<HTMLDivElement>(null!)
  return (
    <div ref={ref} onClick={() => console.log(ref.current.innerText)}>
      点击
    </div>
  )
}
```
## useMemo 
返回一个`memoized`值，它仅会在某个依赖改变时重新计算`memoized`值。如果没有提供依赖项数组，`useMemo会`在每次渲染是都计算新的值
```tsx
export default function UseMemoCom() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const memoized = useMemo(() => {
    return a+b
  }, [a, b])

  return (
    <div>
      <div>sum: {memoized}</div>
      <InputNumber defaultValue={0} onChange={(value) => setA(value)}/>
      <InputNumber defaultValue={0} onChange={(value) => setB(value)}/>
    </div>
  )
}

```
## useCallback
返回一个memoized回调函数，该回调函数仅在某个依赖项改变时才会更新
`useCallback(fn, deps)`相当于`useMemo(() => fn, deps)`
```tsx
export default function UseCallbackCom() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [sum, setSum] = useState(0)

  return (
    <div>
      <div>sum: {sum}</div>
      <InputNumber defaultValue={0} onChange={(value) => setA(value)} />
      <InputNumber defaultValue={0} onChange={(value) => setB(value)} />
      <Button onClick={useCallback(() => setSum(a+b), [a, b])}>相加</Button>
    </div>
  )
}

```
## useContext
`useContext(MyContext)`只是让你能够读取 `context` 的值以及订阅 `context` 的变化。你仍然需要在上层组件树中使用 `<MyContext.Provider>` 来为下层组件提供 `context`。

`useContext` 的参数必须是 *context 对象本身*：

:::tip
需要注意的是，一旦我们组件使用了`useContext()`，那么一旦`Provider`传递的`value`地址发生了改变，就会触发我们组件的重新渲染。
:::

### 练习一
```tsx
import React, {useContext} from 'react'

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
// 为当前的theme创建一个context对象
const ThemeContext = React.createContext(themes.light)

export default function UseContextCom() {
  return (
    // 使用一个 Provider 来将当前的theme传递给以下的组件树，无论多深，任何组件都可以读取这个值
   <ThemeContext.Provider value={themes.dark}>
     <ToolBar/>
   </ThemeContext.Provider>
  )
}

// 中间组件不用再指明向下传递
function ToolBar() {
  return <ThemeButton/>
}

function ThemeButton() {
  // useContext接受context对象作为参数
  const theme = useContext(ThemeContext)
  return <button style={{background: theme.background, color: theme.foreground}}>thmeme</button>
}
```
## useImperativeHandle
`useImperativeHandle(ref, createHandle, [deps])`
`useImperativeHandle`可以让你在使用ref时自定义暴露给父组件的实例值
`useImperativeHandle`应当与`forwardRef`一起使用
### 练习一
直接给组件传ref的话，是没用的。如果想把ref传递给组件内部的元素，必须搭配`forwardRef`
```tsx
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Button, Input } from 'antd'

export default function UseImperativeHandleCom() {
  const inputRef = useRef<any>(null)
  const inputRef1 = useRef<any>(null)

  const handleFocus = () => {
    console.log(inputRef) // {current: null}
  }
  const handleFocusRef = () => {
    console.log(inputRef1)  // {current: input}
    inputRef1.current?.focus();
  }
  return (
    <div>
      <FancyInput ref={inputRef} />
      <FancyInput1 ref={inputRef1} />
      <Button onClick={handleFocus}>组件未结合forwardRef，点击focus</Button>
      <Button onClick={handleFocusRef}>结合forwardRef，点击focus</Button>
    </div>
  )
}

const FancyInput =(props: any) => {
  return <input  />
}
const FancyInput1 = forwardRef((props, ref: any) => {
  return <input ref={ref} />
})

```
### 练习二
搭配`useImperativeHandle`使用
```tsx
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Button, Input } from 'antd'

export default function UseImperativeHandleCom() {
  const inputRef = useRef<any>(null)

  const handleFocus = () => {
    console.log(inputRef) // {current: {focus: () => }}
  }
  return (
    <div>
      <FancyInput ref={inputRef} />
      <Button onClick={handleFocus}>组件结合forwardRef，useImperativeHandle, 点击focus</Button>
    </div>
  )
}

const FancyInput = forwardRef((props: any, ref: any) => {
  const inputRef = useRef<any>(null)
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  return <input ref={inputRef} />
})

```