## hook执行原理
:::info
组件创建的时候会有一块关联的线性存储单元（本质上是链表存储memorizedState）。那么每次执行渲染函数的时候，根据Hook在函数中出现的位置，这个Hook都有权访问（读与写）线性存储单元中对应位置中的数据，这也是为什么我们强制要求每次执行函数时Hook出现的顺序都必须一致。
:::
react当数据改变的时候就会重新渲染，调用组件函数，
```tsx
// [0, false, { current: 0 }, [0], [fn, 'xx']]
const Test = () => { 
  //所以不能在条件判断里面写hook
  const [count, setCount] = useState(0)     
  const [visible, setVisible] = useState(false)

  const name = 'cpp'
  console.log(typeof name)

  const myRef = useRef(count)
  myRef.current = count

  useEffect(() => {
    setTimeout(() => {
      console.log(count)
    }, 3000);
  }, [count])

  const handleCount = () => {
    setCount(count+10)
  }
  const fn = useCallback(() => {
    console.log(myRef.current)
  }, [])

  const handleVisible = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <h2>Test page</h2>
      {/* <TestCom /> */}
      <Button onClick={handleCount} type="primary">点击</Button>
      <Button onClick={fn}>输出</Button>
      <Button onClick={handleVisible}>显示/隐藏Count组件</Button>
      <Count visible={visible} count={count}/>
      <TsCom/>
      <PrettierEslintTest />
    </div>
  )
}
```