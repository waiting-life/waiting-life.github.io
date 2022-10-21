## HTML

### HTML语义化

**1. 什么是HTML语义化？**

表示选择合适的标签（语义化标签）便于开发者阅读和写出更优雅的代码

**2. 为什么要使用语义化标签？**

1). 在没有CSS样式的情况下，页面整体也会呈现很好的结构效果

2). 更有利于用户体验

3). 更有利于搜索引擎优化

4). 代码结构清晰，方便团队开发与维护

**3. HTML5新特性有哪些？**

1). 语义化标签

2). 音视频处理

3). Canvas / WebGL

4). history API

5). requestAnimationFrame

6). 地理位置

7). WebSocket

8). Webworks

## CSS
### 选择器

+ 通配符选择器`*`：选择所有元素

+ 标签选择器`div`
+ id选择器`#box`
+ class类选择器`.box`
+ 分组选择器：`div,span`
+ 组合器
  + 父子选择器`div > p`
  + 后代选择器`div p`
  + 兄弟选择器`div ~ p`
  + 相邻兄弟选择器`div + p`
+ 伪选择器
  + 伪类`:`
  + 伪元素`::`

```css
/* 组合选择器 */
.box, .box2 {
    width: 400px;
    height: 300px;
    border: 2px solid pink;
}
/* 父子选择器，box内部的所有直接p元素添加样式 div > p */
.box > p {
    background-color: rgb(25, 80, 106);
}
/* 后代选择器,给box下面的所有p元素添加样式 div p */
.box p {
    color: pink;
    font-size: 20px;
    font-weight: 700;
}
/* 相邻兄弟选择器,给box相邻的第一个p元素添加样式 div + p */
.box + p {
    background-color: rgb(111, 59, 59);
}
/* 兄弟选择器 box元素的所有兄弟p元素 */
.box ~ p {
    width: 100px;
    height: 100px;
    background-color: lightblue;
    color: #fff;
}
```

```html
<div class="box">
  <p>子p元素1</p>
  <div>
      <p>孙子p元素</p>
      <div>啦啦啦啦</div>
  </div>
  <p>子p元素2</p>
  <p>子p元素3</p>
</div>
<p>同层p元素1</p>
<p>同层p元素2</p>
<div class="box2">
  <span>这是一行文本</span>
</div>
```

### transform



### 行内/行内块元素间隙

```html
<span>111</span>
<span>222</span>
<span>333</span>
```

111，222，333之间会有间隙(谷歌浏览器的间隙为8px)

**产生原因**：

当行内元素之间有空格、回车、tab是就会产生间隙

**解决方法**：

1. 将行内元素写在同一行

```html
<span>111</span><span>222</span><span>333</span>
```

2. 将父元素的`font-size`设置为0，子元素重新给新的`font-size`

```css
.box {
    font-size: 0;
}
.item {
    display: inline-block;
    font-size: 16px;
}
```

```html
<div class="box">
  <div class="item">啦啦啦</div>
  <div class="item">啦啦啦</div>
  <div class="item">啦啦啦</div>
  <div class="item">啦啦啦</div>
</div>
```



### 手写三角形

```css
.box {
    width: 0;
    height: 0;
    border: 60px solid transparent;
    border-top: 60px solid pink;
}
```

```html
<div class="box"></div>
```


### 外边距重叠
块的上外边距 (margin-top)和下外边距 (margin-bottom)有时合并 (折叠) 为单个边距，其大小为单个边距的最大值 (或如果它们相等，则仅为其中一个)，这种行为称为边距折叠。

1. 同一个BFC下，会发生外边距重叠

```css
.child {
    width: 100px;
    height: 100px;
    margin: 100px;
    background-color: pink;
}
```

```html
<div class="box">
    <div class="child">子元素1</div>
    <div class="child">子元素2</div>
</div>
```

2. 可以将元素放在两个不同的BFC容器之中来避免外边距重叠

```css
.box {
    overflow: hidden;
}
.child {
    width: 100px;
    height: 100px;
    margin: 100px;
    background-color: pink;
}
```
```html
<div class="box">
    <div class="child">子元素1</div>
</div>
<div class="box">
    <div class="child">子元素2</div>
</div>
```
### BFC
**具有BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不会再布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。**
**触发BFC**：
下列方式会创建块格式化上下文（BFC）
+ 根元素(HTML)
+ 浮动元素(float的值不为none)
+ 绝对定位元素(position的值为fixed或者absolute)
+ 行内块元素(display的值为inline-block)
+ overflow的值不为visible或者clip的块元素
+ display的值为flow-root的元素
+ 弹性元素(display的值为flex或者inline-flex元素的直接子元素)
+ 网格元素（display值为 `grid` 或 `inline-grid` 元素的直接子元素）

通常，我们会为定位和清除浮动创建新的 BFC，而不是更改布局，因为它将：
+ 包含内部浮动
+ 排除外部浮动
+ 阻止外边距重叠

#### 包含内部浮动
让浮动内容和周围内容等高

1. 给`div`元素一个浮动，由于div子元素脱离，所以此时父元素`.box`元素的高度由`p`元素撑开

```css
.container {
    height: 150px;
    border: 5px solid gold;
}
.box {
    background-color: bisque;
    border: 5px solid rebeccapurple；
}
.float {
    float: left;
    width: 200px;
    height: 100px;
    background-color: aquamarine;
    border: 2px solid pink;
    padding: 10px;
}

```

```html
<div class="container">
    <div class="box">
        <div class="float">I am a floated box!</div>
        <p>I am content inside the container.</p>
    </div>
</div>
```

2. 给父元素添加`overflow:hidden`或者`overflow:auto`。此时形成了一个单独的BFC。
在创建包含浮动元素的 BFC 时，通常的做法是设置父元素 `overflow: auto` 或者其它除默认的 `overflow: visible` 以外的值
使用 `overflow` 创建新的 BFC，是因为 `overflow` 属性会告诉浏览器应该怎样处理溢出的内容。

```css

.container {
    height: 150px;
    border: 5px solid gold;
}
.box {
    background-color: bisque;
    border: 5px solid rebeccapurple;
    overflow: hidden;
}
.float {
    float: left;
    width: 200px;
    height: 100px;
    background-color: aquamarine;
    border: 2px solid pink;
    padding: 10px;
}
```

```html
 <div class="container">
      <div class="box">
          <div class="float">I am a floated box!</div>
          <p>I am content inside the container.</p>
      </div>
  </div>
```

3. 给父元素添加`display:flow-root`。此时也形成了一个新的BFC
一个新的`display`的值，它可以创建无副作用的BFC。在父级块中使用`display:flow-root`可以创建新的BFC。
给 `<div>` 元素设置 `display: flow-root` 属性后，`<div>` 中的所有内容都会参与 BFC，浮动的内容不会从底部溢出。

```css
.container {
    height: 150px;
    border: 5px solid gold;
}
.box {
    background-color: bisque;
    border: 5px solid rebeccapurple;
    display: flow-root;
}
.float {
    float: left;
    width: 200px;
    height: 100px;
    background-color: aquamarine;
    border: 2px solid pink;
    padding: 10px;
}
```

```html
<div class="container">
    <div class="box">
        <div class="float">I am a floated box!</div>
        <p>I am content inside the container.</p>
    </div>
</div>
```

#### 排除外部浮动
正常文档流中建立的 BFC 不得与元素本身所在的块格式化上下文中的任何浮动的外边距重叠

#### 外边距重叠
可以将元素放在两个不同的BFC容器之中来避免外边距重叠
```css
.box {
    overflow: hidden;
}
.child {
    width: 100px;
    height: 100px;
    margin: 100px;
    background-color: pink;
}
```
```html
<div class="box">
    <div class="child">子元素1</div>
</div>
<div class="box">
    <div class="child">子元素2</div>
</div>
```

### transition
```css
 .box {
    width: 200px;
    height: 200px;
    background-color: pink;
    /* 
        transition-property
        transition-duration
        transition-timing-function
        tansition-delay
    */
    transition: width 2s 3s;
}
.box:hover {
    width: 300px;
    height: 300px;
    background-color: lightblue;
}
```
### animation
```css
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
  /* 
      animation-name  动画名
      animation-duration 动画持续时间
      animation-timig-function 动画将如何完成一个周期
      animation-delay 设置动画在启动前的延迟间隔
      animation-iteration-count 动画播放的次数
      animation-direction 指定是否应该轮流反响播放动画
  */
  animation: mymove 3s infinite;
  position: relative;
}
@keyframes mymove {
    from {
        left: 0px;
    }
    to {
        left: 400px;
    }
}
```

### flex

#### 容器属性

+ `display: flex`

+ `flex-direction`
+ `flex-wrap`
+ `flex-flow`
+ `justify-content`
+ `align-items`: 
+ `align-items`在交叉轴上如何对齐。
+ `align-content`定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

#### 项目属性

- `order`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`:`flex-grow` 、`flex-shrink` 和 `flex-basis`的缩写
- `align-self`属性允许单个项目有与其他项目不一样的对齐方式

```css
.container {
    width: 800px;
    background-color: antiquewhite;
    display: flex;
}
.box1 {
    display: flex;
    /* 决定主轴的方向 */
    flex-direction: column;
    /* 定义项目在主轴上的对齐方式 */
    justify-content: center;
    /* 定义项目在交叉轴上如何对齐 */
    align-items: center;
    width: 300px;
    background-color: rgb(199, 145, 80);
    margin-right: 20px;
}
.box1-item {
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    margin: 10px;
    background-color: aquamarine;
}
.box1-item3 {
    /* align-self属性允许单个项目有与其他项目不一样的对齐方式 */
    align-self: flex-end;
}
.box2 {
    /* flex是flex-grow flesx-shrink flex-basis的缩写 */
    flex: 1;
    display: flex;
    /* 定义了多根轴线的对齐方式 */
    align-content: start;
    flex-wrap: wrap;
    background-color: rgb(225, 206, 130);
}
.box2-item {
    background-color: aquamarine;
    color: #fff;
    width: 100px;
    height: 100px;
    margin: 10px;
}
```

```html
<div class="container">
    <div class="box1">
        <div class="box1-item">box1-item1</div>
        <div class="box1-item">box1-item2</div>
        <div class="box1-item box1-item3">box1-item3</div>
        <div class="box1-item">box1-item4</div>
        <div class="box1-item">box1-item5</div>
    </div>
    <div class="box2">
        <div class="box2-item">box2-item1</div>
        <div class="box2-item">box2-item2</div>
        <div class="box2-item">box2-item3</div>
        <div class="box2-item">box2-item4</div>
        <div class="box2-item">box2-item5</div>
        <div class="box2-item">box2-item6</div>
    </div>
</div>
```
### CSS Modules

#### 局部作用域

css产生局部作用域的方法，就是使用一个独一无二的`class`名字,不会与重名。这就是CSS Modules的做法。

#### 全局作用域

CSS Modules允许使用`:global(.className)`的语法，声明一个全局规则。凡是这样声明的`class`，都不会被编译成哈希字符串。

#### 显示的局部作用域语法

`:local(.className)`等同于`.className`

#### 定制哈希类名

`css-loader`磨人的哈希算法是`[hash:base64]`，这会将`.title`编译成`._3zyde4l1yATCOkgn-DBWEL`这样的字符串。

webpack.config.js中可以定制哈希字符串的格式

```js
module: {
  loaders: [
    // ...
    {
      test: /\.css$/,
      loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
    },
  ]
}
```

### Class 的组合

在CSS Modules中， 一个选择器可以继承另一个选择器的规则，这称为组合。

**`.title`继承`.className`**

```css

.className {
  background-color: blue;
}

.title {
  composes: className;
  color: red;
}
```

**选择器也可以继承其他CSS文件里面的规则**

**another.css**

```css
.className {
  background-color: blue;
}
```

```css
.title {
  composes: className from './another.css';
  color: red;
}
```


### grid网格布局

#### 容器属性

+ `display: grid`指定一个容器采用网格布局。
+ 

#### 项目属性
