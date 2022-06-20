

## 组件

### 创建React元素

### createElement()

使用jsx编写的代码最终会被转换成使用`React.createElement()`的形式

### cloneElement()

### React.Component

定义类组件

### React.PureComponent

`React.PureComponent`与`React.Components`相似。

但是`React.PureComponent`以浅层对比prop和state的方式实现了`shouldComponentUpdate()`

### React.memo

为高阶组件。

如果你的组件在相同props下渲染相同的结果，那么可以将其包装在`React.memo`中调用。

### refs

### React.createRef

创建一个能够通过ref属性附加到React元素的ref

### React.forwardRef

`React.forwardRef`会创建一个React组件，这个组件能够将其接受的`ref`属性转发到其组件树下的另一个组件中。

+ 转发`refs`到DOM组件

`FancyButton` 使用 `React.forwardRef` 来获取传递给它的 `ref`，然后转发到它渲染的 DOM `button`

这样，使用 `FancyButton` 的组件可以获取底层 DOM 节点 `button` 的 ref ，并在必要时访问，就像其直接使用 DOM `button` 一样

```tsx
import { useRef, forwardRef } from 'react'
import { Button } from 'antd'
import FancyInput from './FancyInput'

export default function ReactForwardRef() {
  // FancyButton
  const btnRef = useRef<any>(null)
  const handleBtn = () => {
    console.log(btnRef.current)
  }
  return (
    <div>ReactForwardRef
        {/* 转发refs到dom组件 */}
        <FancyButton ref={btnRef}/>
        <Button onClick={handleBtn}>通过ref获取元素</Button>
    </div>
  )
}

// FancyButton组件
const FancyButton = forwardRef((props, ref: any) => {
    return <button ref={ref}>按钮</button>
})
```

+ `React.forwardRef`结合`useImperativeHandle`使用

```tsx
// ReactFordRef组件
import { useRef } from 'react'
import { Button } from 'antd'
import FancyInput from './FancyInput'

export default function ReactForwardRef() {
  const btnRef=  useRef<any>(null)

  const handleFocus = () => {
    btnRef?.current.focus()
  }
  return (
    <div>ReactForwardRef
        <FancyInput ref={btnRef}/>
        <Button onClick={handleFocus}>点击获取input焦点</Button>
    </div>
  )
}
```

```tsx
// FancyInput组件
import { forwardRef, useImperativeHandle, useRef } from 'react'

function FancyInput(props: any, ref: any) {
  const inputRef = useRef<any>(null)
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  return <input ref={inputRef} />
}
export default forwardRef(FancyInput)
```

+ 在高阶组件中转发refs

## Fragments

### React.Fragment

`React.Fragment` 组件能够在不额外创建 DOM 元素的情况下，让 `render()` 方法中返回多个元素。

```tsx
const HelloCom= () => {
  return (
    <React.Fragment>
      <td>Hello</td>
      <td>World</td>
    <React.Fragment/>
  );
}
```

### 短语法

```tsx
const HelloCom= () => {
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
}
```

### React.Lazy

`React.lazy()` 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。

```tsx
// 这个组件是动态加载的
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

### React.Suspense

懒加载组件是 `<React.Suspense>` 支持的唯一用例

```tsx
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

