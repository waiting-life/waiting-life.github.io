"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9913],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return m}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},d=Object.keys(e);for(r=0;r<d.length;r++)t=d[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(e);for(r=0;r<d.length;r++)t=d[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,d=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),p=c(t),m=o,f=p["".concat(s,".").concat(m)]||p[m]||u[m]||d;return t?r.createElement(f,a(a({ref:n},l),{},{components:t})):r.createElement(f,a({ref:n},l))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var d=t.length,a=new Array(d);a[0]=p;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var c=2;c<d;c++)a[c]=t[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},4973:function(e,n,t){t.r(n),t.d(n,{assets:function(){return l},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return u}});var r=t(7462),o=t(3366),d=(t(7294),t(3905)),a=["components"],i={},s=void 0,c={unversionedId:"react/ReactRedux",id:"react/ReactRedux",title:"ReactRedux",description:"redux",source:"@site/docs/react/ReactRedux.md",sourceDirName:"react",slug:"/react/ReactRedux",permalink:"/docs/react/ReactRedux",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/react/ReactRedux.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ReactHooks",permalink:"/docs/react/ReactHooks"},next:{title:"mobx",permalink:"/docs/react/mobx"}},l={},u=[{value:"redux",id:"redux",level:2},{value:"react-redux",id:"react-redux",level:2},{value:"\u91cd\u70b9\u4ee3\u7801",id:"\u91cd\u70b9\u4ee3\u7801",level:3},{value:"\u9012\u5f52\u5904\u7406\u6570\u636e",id:"\u9012\u5f52\u5904\u7406\u6570\u636e",level:4},{value:"index.ts",id:"indexts",level:3},{value:"constant",id:"constant",level:3},{value:"reducers",id:"reducers",level:3},{value:"index.ts",id:"indexts-1",level:3},{value:"user.ts",id:"userts",level:3},{value:"node.ts",id:"nodets",level:3},{value:"\u6839\u7ec4\u4ef6",id:"\u6839\u7ec4\u4ef6",level:3},{value:"APP.tsx \u4e2d\u4f7f\u7528 redux",id:"apptsx-\u4e2d\u4f7f\u7528-redux",level:3},{value:"hooks",id:"hooks",level:3},{value:"useSelector",id:"useselector",level:4},{value:"useStore",id:"usestore",level:4},{value:"useDispatch",id:"usedispatch",level:4}],p={toc:u};function m(e){var n=e.components,t=(0,o.Z)(e,a);return(0,d.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,d.kt)("h2",{id:"redux"},"redux"),(0,d.kt)("h2",{id:"react-redux"},"react-redux"),(0,d.kt)("h3",{id:"\u91cd\u70b9\u4ee3\u7801"},"\u91cd\u70b9\u4ee3\u7801"),(0,d.kt)("h4",{id:"\u9012\u5f52\u5904\u7406\u6570\u636e"},"\u9012\u5f52\u5904\u7406\u6570\u636e"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-ts"},"function* flattenTree(tree: ITree): any {\n  yield tree;\n  if (tree.children) {\n    for (const item of tree.children) {\n      yield* flattenTree(item);\n    }\n  }\n}\n\nfunction flattenTree2(tree: ITree, result: ITree[] = []) {\n  result.push(tree);\n  if (tree.children) {\n    for (const item of tree.children) {\n      flattenTree2(item, result);\n    }\n  }\n  return result;\n}\n\nfunction flattenTree3(tree: ITree) {\n  let result: ITree[] = [];\n  result.push(tree);\n  if (tree.children) {\n    for (const item of tree.children) {\n      result.push(...flattenTree3(item));\n    }\n  }\n  return result;\n}\n")),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-ts"},'function editMoneyById(\n  state: ITree,\n  payload: {\n    id: number;\n    props: Partial<ITree["props"]>;\n  }\n): ITree {\n  if (state.id === payload.id) {\n    return { ...state, props: { ...state.props, ...payload.props } };\n  } else {\n    if (state.children) {\n      for (let item of state.children) {\n        const newItem = editMoneyById(item, payload);\n        if (newItem !== item) {\n          return {\n            ...state,\n            children: state.children.map((i) => (i === item ? newItem : i)),\n          };\n        }\n      }\n      return state;\n    }\n  }\n  return state;\n}\n\nfunction replaceNode(node: ITree, map: (node: ITree) => ITree): ITree {\n  const newNode = map(node);\n  if (newNode !== node) return newNode;\n  else {\n    if (node.children) {\n      for (const item of node.children) {\n        const newItem = replaceNode(item, map);\n        if (newItem !== item) {\n          return {\n            ...node,\n            children: node.children?.map((i) =>\n              i.id === item.id ? newItem : i\n            ),\n          };\n        }\n      }\n      return node;\n    }\n  }\n  return node;\n}\n')),(0,d.kt)("h3",{id:"indexts"},"index.ts"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-ts"},'import { createStore, combineReducers } from "redux";\nimport { userReducer, nodeReducer } from "./reducers";\n\nconst reducer = combineReducers({ user: userReducer, node: nodeReducer });\n\nconst store = createStore(reducer);\nexport default store;\n')),(0,d.kt)("h3",{id:"constant"},"constant"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-ts"},'export const EDIT = "edit";\nexport const ADD_HOBBY = "addHobby";\n\nexport const EDIT_MONEY = "editMoney";\n')),(0,d.kt)("h3",{id:"reducers"},"reducers"),(0,d.kt)("h3",{id:"indexts-1"},"index.ts"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-ts"},'export { userReducer } from "./user";\nexport * from "./tree";\n')),(0,d.kt)("h3",{id:"userts"},"user.ts"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-ts"},'import { EDIT, ADD_HOBBY } from "../constant";\nconst defaultUser = {\n  name: "cpp",\n  age: 2,\n  sex: "male",\n  hobbies: ["code", "game"],\n};\n\ninterface EditAction {\n  type: typeof EDIT;\n  payload: Partial<{\n    name: string;\n    age: number;\n    sex: string;\n  }>;\n}\n\ninterface AddHobbyAction {\n  type: typeof ADD_HOBBY;\n  payload: string[];\n}\n\nexport const userReducer = (\n  state = defaultUser,\n  action: EditAction | AddHobbyAction\n) => {\n  switch (action.type) {\n    case EDIT:\n      return { ...state, ...action.payload };\n    case ADD_HOBBY:\n      return { ...state, hobbies: [...state.hobbies, ...action.payload] };\n    default:\n      return state;\n  }\n};\n')),(0,d.kt)("h3",{id:"nodets"},"node.ts"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-ts"},'import { EDIT_NODE, ADD_NODE, DELETE_NODE } from "../constant";\n\nexport interface INode {\n  id: number;\n  name: string;\n  props: {\n    money: number;\n    car: number;\n  };\n  children?: Array<INode>;\n  root?: boolean;\n}\ninterface EditNodeAction {\n  type: typeof EDIT_NODE;\n  payload: {\n    id: number;\n    props: Partial<INode["props"]>;\n  };\n}\ninterface AddNodeAction {\n  type: typeof ADD_NODE;\n  payload: {\n    id: number;\n    data: any;\n  };\n}\ninterface DeleteNodeAction {\n  type: typeof DELETE_NODE;\n  payload: {\n    id: number;\n  };\n}\n\ntype NodeAction = EditNodeAction | AddNodeAction | DeleteNodeAction;\n\nexport const createEditNodeAction: (\n  payload: EditNodeAction["payload"]\n) => EditNodeAction = (payload) => ({\n  type: EDIT_NODE,\n  payload,\n});\nexport const createAddNodeAction: (\n  payload: AddNodeAction["payload"]\n) => AddNodeAction = (payload) => ({\n  type: ADD_NODE,\n  payload,\n});\nexport const createDeleteNodeAction: (\n  payload: DeleteNodeAction["payload"]\n) => DeleteNodeAction = (payload) => ({\n  type: DELETE_NODE,\n  payload,\n});\n\nconst defaultState: INode = {\n  root: true,\n  name: "boss",\n  id: 1,\n  props: {\n    money: 100000,\n    car: 5,\n  },\n  children: [\n    {\n      name: "leader1",\n      id: 2,\n      props: {\n        money: 30000,\n        car: 2,\n      },\n      children: [\n        {\n          name: "cpp",\n          id: 4,\n          props: {\n            money: 10000,\n            car: 0,\n          },\n          children: [\n            {\n              name: "wqj",\n              id: 5,\n              props: {\n                money: 8000,\n                car: 0,\n              },\n            },\n          ],\n        },\n      ],\n    },\n    {\n      name: "leader2",\n      id: 3,\n      props: {\n        money: 20000,\n        car: 2,\n      },\n      children: [],\n    },\n  ],\n};\n\nfunction replaceNode(node: INode, map: (node: INode) => INode): INode {\n  const newNode = map(node);\n  if (newNode !== node) return newNode;\n  else {\n    if (node.children) {\n      for (const item of node.children) {\n        const newItem = replaceNode(item, map);\n        if (newItem !== item) {\n          return {\n            ...node,\n            children: node.children?.map((i) =>\n              i.id === item.id ? newItem : i\n            ),\n          };\n        }\n      }\n      return node;\n    }\n  }\n  return node;\n}\n\nfunction editById(\n  state: INode,\n  payload: {\n    id: number;\n    props: Partial<INode["props"]>;\n  }\n): INode {\n  if (state.id === payload.id) {\n    return { ...state, props: { ...state.props, ...payload.props } };\n  } else {\n    if (state.children) {\n      for (let item of state.children) {\n        const newItem = editById(item, payload);\n        if (newItem !== item) {\n          return {\n            ...state,\n            children: state.children.map((i) => (i === item ? newItem : i)),\n          };\n        }\n      }\n      return state;\n    }\n    return state;\n  }\n}\n\nfunction edit(\n  state: INode,\n  payload: {\n    id: number;\n    props: Partial<INode["props"]>;\n  }\n): INode {\n  if (state.id === payload.id) {\n    return { ...state, props: { ...state.props, ...payload.props } };\n  } else {\n    if (state.children) {\n      for (let item of state.children) {\n        const newItem = edit(item, payload);\n        if (newItem !== item) {\n          return {\n            ...state,\n            children: state.children.map((i) => (i === item ? newItem : i)),\n          };\n        }\n      }\n      return state;\n    }\n  }\n  return state;\n}\nfunction deleteNodeById(node: INode, id: number): INode | undefined {\n  if (node.id === id) {\n    if (node.root) return node;\n    else {\n      return undefined;\n    }\n  } else {\n    if (node.children) {\n      for (const item of node.children) {\n        const newItem = deleteNodeById(item, id);\n        if (!newItem) {\n          return {\n            ...node,\n            children: node.children.filter((i) => i !== item),\n          };\n        } else if (newItem !== item) {\n          return {\n            ...node,\n            children: node.children.map((i) => (i === item ? newItem : i)),\n          };\n        }\n      }\n      return node;\n    }\n    return node;\n  }\n}\nfunction addNodeByParentId(node: INode, id: number, data: any): INode {\n  if (node.id === id) {\n    return {\n      ...node,\n      children: [\n        ...(node.children || []),\n        { id: new Date().getTime(), ...data },\n      ],\n    };\n  } else {\n    if (node.children) {\n      for (const item of node.children) {\n        const newItem = addNodeByParentId(item, id, data);\n        if (newItem !== item) {\n          return {\n            ...node,\n            children: node.children.map((i) => (i === item ? newItem : i)),\n          };\n        }\n      }\n      return node;\n    }\n  }\n  return node;\n}\n\nexport const nodeReducer = (state = defaultState, action: NodeAction) => {\n  switch (action.type) {\n    case EDIT_NODE:\n      console.log("action", action);\n      // return replaceNode(state, (node) => {\n      //   if (node.id === action.payload.id) {\n      //     return {\n      //       ...node,\n      //       props: {\n      //         ...node.props,\n      //         ...action.payload.props,\n      //       },\n      //     };\n      //   }\n      //   return node;\n      // });\n      return editById(state, action.payload);\n    case ADD_NODE:\n      return addNodeByParentId(state, action.payload.id, action.payload.data);\n    case DELETE_NODE:\n      return deleteNodeById(state, action.payload.id);\n    default:\n      return state;\n  }\n};\n')),(0,d.kt)("h3",{id:"\u6839\u7ec4\u4ef6"},"\u6839\u7ec4\u4ef6"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-tsx"},'import ReactDOM from "react-dom";\nimport App from "./App";\nimport { BrowserRouter } from "react-router-dom";\nimport { Provider } from "react-redux";\nimport "@ant-design/pro-table/dist/table.css";\nimport "@ant-design/pro-layout/dist/layout.css";\nimport "@ant-design/pro-form/dist/form.css";\nimport "antd/dist/antd.css";\nimport store from "./store";\n\nReactDOM.render(\n  <Provider store={store}>\n    <BrowserRouter>\n      <App />\n    </BrowserRouter>\n  </Provider>,\n\n  document.getElementById("root")\n);\n')),(0,d.kt)("h3",{id:"apptsx-\u4e2d\u4f7f\u7528-redux"},"APP.tsx \u4e2d\u4f7f\u7528 redux"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-tsx"},'import { useState } from "react";\nimport Other from "./pages/Other";\nimport Test from "./pages/Test";\nimport Home from "./pages/Home";\nimport Login from "./pages/Login";\nimport { Switch, Route } from "react-router-dom";\nimport { useSelector, useStore, useDispatch } from "react-redux";\nimport { INode } from "./store/reducers";\nimport { InputNumber } from "antd";\nimport { useFlattenedTree, useNode } from "./store/hooks";\nimport {\n  createEditAction,\n  createAddHobbyAction,\n  createEditNodeAction,\n  createDeleteNodeAction,\n  createAddNodeAction,\n} from "./store/reducers";\n\n// function* flattenTree(tree: INode): any {\n//   yield tree;\n//   if (tree.children) {\n//     for (const item of tree.children) {\n//       yield* flattenTree(item);\n//     }\n//   }\n// }\n\n// function flattenTree2(tree: INode, result: INode[] = []) {\n//   result.push(tree)\n//   if(tree.children) {\n//     for(const item of tree.children) {\n//       flattenTree2(item, result)\n//     }\n//   }\n//   return result\n// }\n\nexport function* flattenTree(tree: INode): any {\n  yield tree;\n  if (tree.children) {\n    for (const item of tree.children) {\n      yield* flattenTree(item);\n    }\n  }\n}\n\nfunction flattenTree2(tree: INode, result: INode[] = []) {\n  result.push(tree);\n  if (tree.children) {\n    for (const item of tree.children) {\n      flattenTree2(item, result);\n    }\n  }\n  return result;\n}\n\nfunction flattenTree3(tree: INode) {\n  let result: INode[] = [];\n  result.push(tree);\n  if (tree.children) {\n    for (const item of tree.children) {\n      result.push(...flattenTree3(item));\n    }\n  }\n  return result;\n}\n\nconst App = () => {\n  const [money, setMoney] = useState<number>(0);\n  const dispatch = useDispatch();\n  const user = useSelector((state: any) => state.user);\n  const arr = useFlattenedTree();\n\n  // user\n  const changeUser = () => {\n    dispatch(createEditAction({ name: "www" }));\n  };\n\n  const addHobby = () => {\n    dispatch(createAddHobbyAction(["study", "music"]));\n  };\n\n  // node\n  const node = useNode(2);\n  console.log(node, "node======");\n\n  const changeMoney = (id: number, money: number) => {\n    dispatch(\n      createEditNodeAction({\n        id,\n        props: {\n          money,\n        },\n      })\n    );\n  };\n\n  const deleteNodeById = (id: number) => {\n    dispatch(createDeleteNodeAction({ id }));\n  };\n\n  const addNode = (id: number) => {\n    dispatch(\n      createAddNodeAction({\n        id,\n        // data: { name: "leader3", props: { money: 30000, car: 1 } },\n        data: { name: "www", props: { money: 8000, car: 0 } },\n        // data: { name: "leader4", props: { money: 30000, car: 3 } },\n      })\n    );\n  };\n  return (\n    <div className="App">\n      <div>\n        <h2>\u7528\u6237\u57fa\u672c\u4fe1\u606f</h2>\n        <div>\n          <div>\u59d3\u540d: {user.name}</div>\n          <div>\u5e74\u9f84: {user.age}</div>\n          <div>\u6027\u522b: {user.sex}</div>\n          {user.hobbies.map((item: string) => (\n            <div key={item}>{item}</div>\n          ))}\n        </div>\n        <button onClick={changeUser}>\u4fee\u6539\u7528\u6237\u57fa\u672c\u4fe1\u606f</button>\n        <button onClick={addHobby}>\u6dfb\u52a0\u7231\u597d</button>\n      </div>\n      <div>\n        <h2>\u4fe1\u606f\u5c55\u793a</h2>\n        <button onClick={() => addNode(3)}>\u6dfb\u52a0node</button>\n        {arr.map((item: any) => (\n          <div key={item.id}>\n            \u59d3\u540d\uff1a{item.name}\n            \u85aa\u8d44\uff1a{item.props.money}\n            <div style={{ display: "flex" }}>\n              <InputNumber\n                value={money}\n                onChange={(value: any) => setMoney(value)}\n              />\n              <button onClick={() => changeMoney(item.id, money)}>\n                \u4fee\u6539\u85aa\u8d44\n              </button>\n            </div>\n            <button onClick={() => deleteNodeById(item.id)}>\u5220\u9664node</button>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n};\n\nexport default App;\n')),(0,d.kt)("h3",{id:"hooks"},"hooks"),(0,d.kt)("h4",{id:"useselector"},"useSelector"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-tsx"},'import { useSelector } from "react-redux";\n\nconst user = useSelector((state: any) => state.user);\n')),(0,d.kt)("h4",{id:"usestore"},"useStore"),(0,d.kt)("h4",{id:"usedispatch"},"useDispatch"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-tsx"},'import { useDispatch } from "react-redux";\n\nconst dispatch = useDispatch();\n')))}m.isMDXComponent=!0}}]);