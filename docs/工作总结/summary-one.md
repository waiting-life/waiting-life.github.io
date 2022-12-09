### 反思
明明一切有迹可循，第一反应确实觉得神奇（ps: 怎么会有这么奇怪的bug


#### 1. 深入理解react key值问题
key值重复导致的问题
[https://www.teambition.com/task/638f14d5fea3b7004077b5ca](https://www.teambition.com/task/638f14d5fea3b7004077b5ca)
key值变化引起的问题
具体案例，客户端密码框

### 2. export 导致的循环引用问题

```bash
git checkout 78ce91dbaab2dff52416ea4e70274876fbd4d85e
```





### 3. useMemo的依赖改变导致复杂组件的重新刷新问题

[https://www.teambition.com/task/63918aa2dfbd86003f9bdeb0](https://www.teambition.com/task/63918aa2dfbd86003f9bdeb0)



### 4. 设置样式时写死宽度导致的在不同视口下面页面展示不完全



[https://www.teambition.com/task/63896b35c9b0a7003f2d0c2f](https://www.teambition.com/task/63896b35c9b0a7003f2d0c2f)



+ 每次需求需要把每个页面需要用到的字段和接口文档的上的对应上去
+ 调接口注意问清楚每个参数传不传，不能因为以前有这个需求就觉得不用改动
+ UI部分尽早确认无误，把能做好的做到无误
+ 多熟悉了解项目组件封装用法