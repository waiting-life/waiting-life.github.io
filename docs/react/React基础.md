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

