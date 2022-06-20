**1. react更新渲染大致流程**
函数式组件渲染，其实就是调用函数，返回对应的虚拟dom，第一次调用的时候根据虚拟dom创建真实的dom树，后面组件重新渲染的时候会生成新的虚拟dom，新的虚拟dom和上一次的虚拟dom进行diff比较，就会自动的操作真实的dom

**2. react性能优化**



**3. 怎么寻找react页面卡顿的原因**



**4. react生命周期**

componentDidMount
componentWillUnmount

**5. React16.8新增特性**
hooks

**6使用过的Hooks**
**useState**
**useEffect**
**useMemo**
**useRef**
**useCallback**
**useContext**

**useImperativeHandle**: `useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值

`useImperativeHandle` 应当与 [`forwardRef`](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 一起使用：

**7. 手写题：使用useEffect实现倒计时组件**



**8. useEffect的依赖项**

[]
[count]

**9. useState为什么不能放在判断语句中**

每次渲染hooks的值是按照hook出现的位置获取的，所以要保持位置的一致



**10. useRef**

获取dom节点的时候

**11. useMemo和useCallback**

useMemo是缓存一个值
useCallback缓存一个函数的地址

**12. React合成事件**

onClick
兼容性更好
通过时间委托的原理

**13. jsx怎么转换为js执行**
一般通过babel将jsx转换为js

```jsx
<div></div>
React.createElement('div')
```

**14. 在react中如何避免不必要的渲染**

1. 函数式组件可以使用React.memo
2. 类组件可以通过使用PureComponent

**15.**
