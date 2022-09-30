`MobX` 提供了优化应用状态与 React 组件同步的机制，这种机制就是使用响应式虚拟依赖状态图表，它只有在真正需要的时候才更新并且永远保持是最新的。

## 概念

```tsx
import React from "react";
import { render } from "react-dom";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class AppState {
  timer = 0;

  constructor() {
    makeAutoObservable(this);
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  reset = () => {
    this.timer = 0;
  };
}

const TimerView = observer(({ appState }) => (
  <button onClick={appState.reset}>Seconds passed: {appState.timer}</button>
));

render(
  <div>
    <TimerView appState={new AppState()} />
  </div>,
  document.getElementById("root")
);

```

## Observable state

+ `Mobx`为现有的数据结构(如对象，数组和类实例)添加了可观察的功能.

+ 通过使用@observable装饰器来给你的属性添加注解

```ts
import { observable } from "mobx";

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
```

`observer` 函数/装饰器可以用来将 React 组件转变成响应式组件

何时使用`observer`

### Computed values

+ 使用`Mobx`你可以定义在相关数据发生变化时自动更新的值。

+ 通过使用`@computed`装饰器或者利用`(extend)Observable`时调用的`getter/setter`函数来进行使用

```tsx
class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
```

### Reactions

Reactions和计算很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求等等

#### React组件

+ 如果使用react，可以把无状态函数组件变成响应式组件，方法是在组件上添加observer函数/装饰器。

+ `observer`由 `mobx-react` 包提供
+ `observer`会将React（函数）组件转换为它们需要渲染的数据的衍生。
+ `Mobx`会确保组件总是在需要的时候重新渲染。

```tsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)

const store = new TodoList();
ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('mount'));

```



#### 自定义reactions

使用`autorun`、`reaction`、`when`函数即可简单的创建自定义reactions。

每当`unfinishTodoCount`的数量发生变化的时候，下面的`authorun`就会打印日志消息。

```ts
autorun(() => {
    console.log("Tasks left: " + todos.unfinishedTodoCount)
}
```

+ **`Mobx`会对在执行跟踪函数期间读取的任何可观察属性做出反应。**

**计算值** 是自动响应状态变化的**值**。 **反应** 是自动响应状态变化的**副作用**

### Actions

应该对修改状态的函数使用action

**绑定的action**

action装饰器/函数遵循js中标准的绑定规则。但是，`action.bound`可以用来自动的将动作绑定到目标对象。

*注意: `action.bound`不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定。*

## `Mobx`要点

### 1. 定义状态并使其可观察

确保属性打上`mobx`的标记使得他们变得可观察的

```tsx
import { observable } from 'mobx'
const appState = observable({
    timer: 0
})

// 或者
@observable appState = {
    timer: 0
}
```

### 2. 创建视图并使其可观察

+ 我们的`appState`还没有观察到任何的东西，创建视图，当appState中相关数据发生变化时视图会自动更新。

```tsx
import {observer} from 'mobx-react';

@observer
class TimerView extends React.Component {
    render() {
        return (
            <button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>
        );
    }

    onReset() {
        this.props.appState.resetTimer();
    }
};

ReactDOM.render(<TimerView appState={appState} />, document.body);
```

### 3. 更改状态

使用`observable`来装饰**状态和视图**，足以让mobx检测所有关系了。



## API

#### observable(value)

用法

+ `observable(value)`
+ `@observable classProperty = value`

Observable 值可以是JS基本数据类型、引用类型、普通对象、类实例、数组和映射。

#### MobXProviderContext

```tsx
import { MobXProviderContext } from 'mobx-react';
import React from 'react';

export function useStores() {
  return React.useContext(MobXProviderContext);
}

export function useInjectedStore<T =unknown>(name: string):T {
  let mobxContext = React.useContext(MobXProviderContext);
  return mobxContext[name] || null;
}
```

#### React 组件的 `observer` 装饰器

**observer**

可以用作包裹React组件的高阶组件。在组件的`render`函数中的**任何已使用的observable**发生变化时，组件都会自动重新渲染。

**autorun**

+ `autorun`负责运行所提供的`sideEffect`并追踪在`sideEffect`运行期间访问过的observable的状态。

+ 将来如果有其中一个已使用的 observable 发生变化，同样的`sideEffect`会再运行一遍。 `autorun` 返回一个清理函数用来取消副作用。

**when**

用法： `when(() => condition, () => { sideEffect }, options)`

 `condition` 表达式会自动响应任何它所使用的 observable。 一旦表达式返回的是真值，副作用函数便会立即调用，但只会调用一次。

**注意:** *副作用函数* (第二个参数) 其实是可选的。如果不提供副作用函数的话，将返回一个可取消的 promise (即具有 `cancle()` 方法的 promise)

`when` 返回清理器以尽早地取消操作。

如果没有给 `when` 传递副作用函数的话，它将返回一个可以等待条件结束的 promise 。

### 实用工具

**Provider**

可以用来使用React的context机制来传递store给子组件。

**inject**

相当于Provider的高阶组件。可以用来从React的context中挑选store作为prop传递给目标组件。

### 编写异步Actions

+ `action`包装/装饰器只会对当前运行的函数做出反应，而不会对当前运行函数所调用的函数作出反应

+ 这意味着如果action中存在`setTimeout`、promise的`then`或者`async`语句，并且在回调函数中某些状态改变了，那么这些回调函数也应该包装在`action`中。

#### Promises

#### ruInAction工具函数

#### `async/await`

```tsx
mobx.configure({ enforceActions: true })

class Store {
    @observable githubProjects = []
    @observable state = "pending" // "pending" / "done" / "error"

    @action
    async fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = await fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            // await 之后，再次修改状态需要动作:
            runInAction(() => {
                this.state = "done"
                this.githubProjects = filteredProjects
            })
        } catch (error) {
            runInAction(() => {
                this.state = "error"
            })
        }
    }
}

```

#### flows

```tsx
mobx.configure({ enforceActions: true })

class Store {
    @observable githubProjects = []
    @observable state = "pending"

    fetchProjects = flow(function * () { // <- 注意*号，这是生成器函数！
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = yield fetchGithubProjectsSomehow() // 用 yield 代替 await
            const filteredProjects = somePreprocessing(projects)
            // 异步代码块会被自动包装成动作并修改状态
            this.state = "done"
            this.githubProjects = filteredProjects
        } catch (error) {
            this.state = "error"
        }
    })
}

```

