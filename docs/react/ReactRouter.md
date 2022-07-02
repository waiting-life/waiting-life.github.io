### 配置文件方式

**router.ts**

```ts
import AntdTest from '../pages/AntdTest'
import ReduxTest from '../pages/ReduxTest'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Other from '../pages/Other'
import Test from '../pages/Test'
import ReactTest from '../pages/ReactTest'

// () => import(/* webpackChunkName: "about" */'../pages/Home')

export interface RouteItem {
  path: string;
  title?: string;
  component?: any;
  redirect?: string;
  routes?: RouteItem[]
}

export const routes: RouteItem[] = [
  {
    path: '/home', 
    title: '首页',
    component: Home
  },
  {
    path: '/mytest',
    title: '我的练习',
    routes: [
      {
        path: '/antd-test',
        title: 'antd练习',
        component: AntdTest
      },
      {
        path: '/react-test',
        title: 'react练习',
        component: ReactTest
      },
      {
        path: '/redux-test',
        title: 'redux测试',
        component: ReduxTest
      },
    ]
  },
  {
    path: '/other',
    title: '其他',
    component: Other
  },
  {
    path: '/test',
    title: '测试',
    component: Test
  },
  {
    path: '/login',
    component: Login
  },
]
```

**APP.tsx**

```tsx
// 路由跟组件匹配
function RouteWithSubRoutes(MyRoute: RouteItem) {
  return (
    <Route
      path={MyRoute.path} 
      render={props => (
        <MyRoute.component {...props} routes={MyRoute.routes} />
      )}
    />
  );
}

// 递归生成路由
function* generateRoutes(routes: RouteItem[]): any {
  for (const route of routes) {
    yield  <RouteWithSubRoutes key={route.path} {...route} />
    if (route.routes) {
      yield* generateRoutes(route.routes)
    }
  }
}

<Switch>
  {Array.from(generateRoutes(routes))}
</Switch>
```

**antd中，根据routes生成对应menu**

```tsx
interface RouteItem {
  path: string;
  title?: string;
  component?: any;
  redirect?: string;
  routes?: RouteItem[]
}
type MenuItem = Required<MenuProps>['items'][number];

function getItems(routes: RouteItem[]) {
  let arr: MenuItem[] = []
  routes
  .filter((item) => item.title)
  .forEach((item) => {
    arr.push({
        key: item.path,
        label: item.title,
        children: item.routes && getItems(item.routes) 
    })
  })
  return arr
}
const items: MenuItem[] = getItems(routes)


<Menu
  onClick={handleMenuItem}
  defaultSelectedKeys={['/home']}
  defaultOpenKeys={['sub1']}
  mode="inline"
  theme="dark"
  items={items} 
/>
```

### React Router6

与React router5相比

+ 内置组件的变化：移除了Switch，新增Routes
+ 语法的变化：component={About}变为element={<About/>}
+ 新增多个hook：`useParams`，`useNavigate`，`useMatch`
+ React Router6想要自定义类名，需要将className写为一个函数。

```tsx
<Routes>
	<Route path='/about' element={<About />} />
  <Route path='/home' element={<Home />} />
  <Route path='/' element={<Navigate to='/about' replace={true} />} />
</Routes>
```

**2. `<Navigate/>`**

+ 作用：只要Naviagate组件被渲染，就会修改路径，切换视图。
+ replace属性用于控制跳转模式（push还是replace默认是push）



**3. `<Routes/>`与 `<Route/>`**

+ `<Routes/>`要和`<Route/>`结合使用，且`<Routes/>`必须包裹`<Route/>`
+ 当URL变化的时候，`<Routes/>`会查看其所有的`<Route/>`元素以找到最佳匹配呈现组件。
+ `<Route/>`也可以嵌套使用，且可配合`useRoutes`配置路由表，单需要`<Outlet/>`组件来渲染其子路由

**4. `<Outlet />`**



**5. 路由表和嵌套路由**

```tsx
export default routes = [
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />，
        children: [
        	{
        		path: 'detail/:id/:itle/:content',
        		element: <Detail />
      		}
        ]
      }
    ]
  },
  {
    path: '/',
    element: <Navigate to='/about' />
  }
])

export const Demo = () => {
  return (
  	<>
    	<NavLink to="news">News</NavLink>
      {/*点击子路由不想让父组件有高亮的话添加end*/}
      <NavLink to="message" end>Message</NavLink>
    	{/* 指定路由组件显示的位置 */}
    	<Outlet />
    </>
  )
}
```



### hooks

**useRoutes**

**useParams**

**useMatch**

**useSearchParams**

**useLocation**

**useNavigate**

