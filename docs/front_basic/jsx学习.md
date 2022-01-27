---
title: 'jsx'
date: 2022-01-27
tag:
  - 前端学习
categories:
  - 前端学习
---

## jsx

### 虚拟 DOM

#### 1. jsx 创建虚拟 DOM

```jsx
const VDOM = (
  <h1 id="title">
    <span>Hello, React</span>
  </h1>
)

// 胫骨哦babel翻译
const VDOM = React.createElement(
  'h1',
  { id: 'title' },
  React.createElement('span', {}, 'Hello. React')
)
```

#### 2. js 创建虚拟 DOM

```js
const VDOM = React.createElement(
  'h1',
  { id: 'title' },
  React.createElement('span', {}, 'Hello. React')
)
```

**总结**：**jsx 是为了更方便的创建虚拟 DOM**

#### 3. 虚拟 DOM

- 虚拟 DOM 本质上是 Object 类型的对象（一般对象）
- 虚拟 DOM 属性少， 真实 DOM 属性多，因为虚拟 DOM 是 React 内部在用，无需真实 DOM 上那么多属性。
- 虚拟 DOM 最终会被转化成真实 DOM，展现在页面上

### jsx 语法规则

1. 定义虚拟 DOM 时，不要写引号
2. 标签中混入 js 表达式时要用{}
3. 样式的类名指定要用 className
4. 内联样式，比如`<span style="{{color: 'white';fontSize: '30px'}}">哈哈哈哈哈</span>`要这样写
5. 虚拟 DOM 必须只有一个根标签
6. 标签必须闭合
7. 标签首字母
   - 若小写字母开头，则将该标签改为 html 中同名元素，若 html 中无该标签对应的同名元素，则报错。
   - 若大写字母开头，react 就去渲染对应的组件，若组件没有被定义，则报错。
