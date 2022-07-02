### JSX

实际上，JSX 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖。如下 JSX 代码：

```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

**会被编译为**

```jsx
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```



**jsx防止注入攻击**

`React DOM` 在渲染所有输入内容之前，默认会进行[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)。这样可以有效的防止`XSS`攻击

**JSX表示对象**

`babel`会把`JSX`转译成为一个`React.createElement()`函数调用

#### 指定React元素类型

JSX 标签的第一部分指定了 React 元素的类型。

大写字母开头的 JSX 标签意味着它们是 React 组件。这些标签会被编译为对命名变量的直接引用，所以，当你使用 JSX `<Foo />` 表达式时，`Foo` 必须包含在作用域内。



### React事件

`React`事件采用小驼峰写法

在`React`中你不能通过返回`false`的方式组织默认行为

必须显示的使用`preventDefault`

合成事件除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，

### Hook规则

**1. 只在最顶层使用hook**

**不要在循环，嵌套，条件语句中使用Hook**，这样就能确保Hook 在每一次渲染中都按照同样的顺序被调用

**2. 只在React函数中使用Hook**

在`React`函数组件中调用`Hook`

在自定义`Hook`中调用其他`Hook`

### 高阶组件

**高阶组件是函数参数为组件，返回值为新组件的函数**

组件是将props转换为UI，而高阶组件是将组件转换为另一个组件。

HOC 通过将组件*包装*在容器组件中来*组成*新组件。HOC 是纯函数，没有副作用。

### React性能优化

**确保使用生产版本**

**类组件使用React.pureComponent()**

**函数式组件使用React.memo()**

**useMemo useCallback**

**React Fragments 避免额外标记**

### Portals

传送门

#### 用法

一般用于创建Modal

**render到一个组件里面去，实际改变的是网页上另一处的DOM结构**。

```tsx
// MyModal
import { createPortal } from 'react-dom'

const element = document.querySelector('#root') as Element
const MyModal = ({visible} : {visible: boolean}) => {
  if(!visible) return null
  return createPortal(
    <div style={{ background: 'pink', width: 400, height: 400}}>
        <h2>modal</h2>
    </div>,
    element
  )
}
export default  MyModal


// PortalCom
import { Button } from 'antd'
import { useState } from 'react'
import MyModal from '../../../components/MyModal'

export default function PortalCom() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
        <h2>Portal</h2>
        <Button onClick={() => setVisible(true)}>打开MyModal</Button>
        <MyModal visible={visible}/>
    </div>
  )
}
```

#### 通过Portal进行事件冒泡

尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React子节点行为一致。

一个从 portal 内部触发的事件会一直冒泡至包含 *React 树*的祖先

### 函数式组件和类组件

#### 函数式组件和类组件区别

**父组件：Profile**

```tsx
export default class Profile extends Component {
  state = {
    user: 'Dan'
  }

  render() {
    return (
      <>
        <label>
          <b>Choose profile to view: </b>
          <select
            value={this.state.user}
            onChange={e => this.setState({ user: e.target.value })}
          >
            <option value="Dan">Dan</option>
            <option value="Sophie">Sophie</option>
            <option value="Sunil">Sunil</option>
          </select>
        </label>
        <h1>Welcome to {this.state.user}’s profile!</h1>
        <p>
          <PageFunction user={this.state.user} />
          <b> (function)</b>
        </p>
        <p>
            {/* @ts-ignore */}
          <PageClass user={this.state.user} />
          <b> (class)</b>
        </p>
        <p>
          Can you spot the difference in the behavior?
        </p>
      </>
    )
  }
}
```



**函数式组件: PageFunction**

当我们点击了按钮之后再选中Sophie会在三秒之后会输出我们点击的时候的Dan。这是符合我们预期的。

```tsx
export default function PageFunction(props: any) {
  const { user } = props
  const showMessage = () => {
    alert(`Followed  ${user}`)
  }
  const handleClick = () => {
    setTimeout(showMessage, 3000)
  }
  return (
    <Button onClick={handleClick}>Follow</Button>
  )
}
```

**类组件：PageClass**

当我们点击了按钮之后再选中Sophie会在三秒之后输出最新的Sophie，这不是我们想要的，我们想要在三秒后输出我们点击的时候的Dan。

```tsx
export default class PageClass extends Component {
  showMessage = () => {
    alert(`Followed ${this.props.user}`)
  }

  handleClick = () => { 
    setTimeout(showMessage, 3000)
  }
  render() {
    return (
        <Button onClick={this.handleClick}>点击</Button>
    )
  }
}
```

#### 在函数式组件中也可以通过ref获取到最新的值

**如果我们想要读取并不属于这一次特定渲染的，而是最新的props和state**

+ 在类中，我们可以通过`this.state`或者`this.props`来实现。因为this本身是可变的。
+ 在函数式组件中，也可以拥有一个在所有的组件渲染帧中共享的可变变量。它被成为“ref”：

```tsx
export default function PageFunction(props: any) {
  const [value, setValue] = useState()
  const valRef = useRef()
  const showLatestValue = () => {
    alert(`followed ${valRef.current}`)
  }
  const handleChange = (e: any) => {
    setValue(e.target.value)
    valRef.current = e.target.value
  }
  const getLatestValue = () => {
    setTimeout(showLatestValue, 3000)
  }

  const showValue = () => {
    alert(`followed ${value}`)
  }
  const getValue = () => {
    setTimeout(showValue, 3000)
  }
  return (
    <>
        <Input value={value} onChange={handleChange}/>
        <Button onClick={getLatestValue}>获取最新value</Button>
        <Button onClick={getValue}>获取value</Button>
    </>
  )
}

```

### 类组件

#### class: 类中的方法默认开启了局部严格模式

```ts
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    // getName方法放在了哪里？——类的原型对象上，供实例使用。
    // 通过Person实例调用getName时，getName中的this就是Person实例
    getName() {
        console.log(this)
        console.log(this.name)
    }
}
const p = new Person('cpp', 22)
p.getName() // 通过实例调用getName方法

// 类中所有定义的方法都在局部开启了严格模式，所以this为undefined
// 所以上述getName相当于
// function getName() {
//     'use strict'
//     console.log(this, this.name)
// }
const x = p.getName
x()  // 函数的直接调用,因为类中定义的方法都在局部开启了严格模式，所以调用的时候读到的this是undefined不是Window实例对象

function demo() {
    console.log(this, 'demo') // Window实力对象
}
demo()

function demo1() {
    'use strict'
    console.log(this)
}
demo1() // undefined
```

#### this

+ 类中声明的函数放在了类的原型对象上供实例使用
+ 点击按钮触发的函数调用是作为onClick的回调调用，是直接调用。

```tsx
export  class Person extends Component {
    constructor(props: any) {
        super(props)
        this.state = { name: 'cpp' }
        // 这里将绑定了this之后的handleChangeName赋值给了我们实例上的this.handleChangeName
        // 点击按钮之后调用的handleChangeName是我们实例上的handleChangeName(原型链)
        this.handleChangeName = this.handleChangeName.bind(this)
    }
    handleChangeName() {
        // handleChangeName放在哪里？—— PageClass的原型对象上，供实例使用
        // 由于handleChangeName是作为onClick的回调，不是通过实例调用的，是直接调用。
        // 类中的方法默认开启了局部的严格模式，所以这里的this为undefined
        console.log(this)
    }
  
    render() {
        return (
            <>
                {/* @ts-ignore  */}
                <span>name: {this.state.name}</span>
                <Button onClick={this.handleChangeName}>点击按钮修改名字</Button>
            </>
        )
    }
}
```

**精简上面代码**

```tsx
export  class Person extends Component {
    state = { name: 'cpp'}
  
    // 这样的写法直接将handleChangeName放在了实例上
  	handleChangeName = () => {
        // 箭头函数没有this，这里的this为箭头函数外面作用域中的this，也就是实例对象
        console.log(this) // Person实例
    }
    render() {
        return (
            <>
                {/* @ts-ignore  */}
                <span>name: {this.state.name}</span>
                <Button onClick={this.handleChangeName}>点击按钮修改名字</Button>
            </>
        )
    }
}
```

