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

