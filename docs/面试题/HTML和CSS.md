## HTML

**1. HTML语义化**

使用恰当的语义的HTML标签和CSS class等内容，让页面具有良好的语义和结构

+ 用适当的标签
+ 页面内容结构化
+ 无CSS也能进行网页阅读
+ 方便浏览器，搜索引擎SEO

**2. HTML语义化在CSS加载前怎么保持网页完整结构**



**3. HTML文档结构**



**4. script标签放head和body中的区别**

## CSS
 **1. position**

static： 静态定位是元素默认的定位方式，无定位的意思

relative： 相对定位，相对定位是元素在移动的时候，是相对于它原来的位置,原来标准流的位置还在

absolute： 绝对定位是相对于最近已经定位的祖先元素来定位

fixed：固定定位。相对于浏览器的可视区域位置来定位。

sticky：粘性定位。可以被认为是相对定位和固定定位的组合。等元素到我们设置的定位的位置时就不会再移动了。



```css
 body {
    margin: 0;
    padding: 0;
}
.parent1, .parent2 {
    width: 400px;
    height: 600px;
}
.parent1 {
    position: relative;
    top: 100px;
    background-color: aquamarine;
}
.parent2 {
    background-color: antiquewhite;
}
.child1 {
    position: absolute;
    top: 40px;
    left: 40px;
    background-color: antiquewhite;
    width: 100px;
    height: 100px;
}
.child2 {
    position: fixed;
    top: 40px;
    height: 40px;
    background-color: bisque;
    width: 100px;
    height: 100px;
}
.child3 {
    position: sticky;
    width: 50px;
    height: 50px;
    background-color: burlywood;
    top: 20px;
    left: 200px;
}
```

```html
<div class="parent1">
  <div class="child1">child1</div>
  <div class="child2">child2</div>
  <div class="child3">child3</div>
</div>
<div class="parent2">
  parent2
</div>
```



**2. 行内块元素之间出现间隙的原因以及如何解决**

元素标签之间换行空格等符号造成的。

解决方法：将行内元素或者行内块元素标签写在同一行。

**3. 行内元素设置padding有什么效果？**



**4. transfrom**

**transform**应用于元素的2D、3D转换。允许你旋转、缩放、倾斜、或者平移给定元素。

+ 移动： transform: translate(x, y)    translateX(x)     translateY(y)
+ 缩放： scale(x, y)    scaleX(x)   scaleY(y)
+ 旋转：rotate(angle)
+ 倾斜： skew(*x-angle*,*y-angle*)

```csss
transform: translate(100px, 100px) rotate(45deg) scale(2) skew(30deg, 20deg);
```

**5. css常用单位**

+ px
+ 百分比%
+ em，rem常见相对单位。
  + em取决于父元素的字体大小
  + rem是相对于根元素。
+ vw，vh
  + 100vw为浏览器视窗宽度
  + 100vh为浏览器视窗高度

**6. rem适配**



**7. flex**

**容器属性**

**项目属性**

**8. **

**5. 什么是bfc**

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

#### 外边距重叠
创建新的BFC避免两个相邻`div`之间的外边距重叠
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

##### **6. 伪类和伪元素**

**伪类：**

**伪类**是选择器的一种，它用于选择处于特定状态的元素

**伪类**开头为冒号`:`

**伪元素:** 

**伪元素**表现得是像你往标记文本中加入全新的 HTML 元素一样，而不是向现有的元素上应用类。

伪元素开头为双冒号`::`。



