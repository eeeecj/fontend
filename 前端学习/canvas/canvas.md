# [canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

## [\<canvas\>\</canvas>](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

`<canvas> `看起来和 `<img>` 元素很相像，唯一的不同就是它并没有 src 和 alt 属性。实际上，`<canvas>` 标签只有两个属性—— width 和 height。<br>
这些都是可选的，并且同样利用 DOM properties 来设置。当没有设置宽度和高度的时候，canvas 会初始化宽度为 300 像素和高度为 150 像素。<br>
该元素可以使用 CSS 来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布的比例不一致，它会出现扭曲。

## [替换内容](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

我们只是在`<canvas>`标签中提供了替换内容。不支持`<canvas>`的浏览器将会忽略容器并在其中渲染后备内容。而支持`<canvas>`的浏览器将会忽略在容器中包含的内容，并且只是正常渲染 canvas。

```html
<canvas id="stockGraph" width="150" height="150">
  current stock price: $3.15 +0.15
</canvas>

<canvas id="clock" width="150" height="150">
  <img src="images/clock.png" width="150" height="150" alt="" />
</canvas>
```

## [渲染上下文](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

`<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。<br>
`<canvas> `元素有一个叫做 [getContext()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)的方法，这个方法是用来获得渲染上下文和它的绘画功能。getContext()接受一个参数，即上下文的类型。

```JS
var canvas = document.getElementById('tutorial');
var ctx =canvas.getContext('2d');
```

## [检查支持性](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

替换内容是用于在不支持 `<canvas> `标签的浏览器中展示的。通过简单的测试 getContext()方法的存在，脚本可以检查编程支持性。上面的代码片段现在变成了这个样子：

```JS
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

## 一个模板骨架

```html
<html>
  <head>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw() {
        var canvas = document.getElementById("tutorial");
        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
        }
      }
    </script>
    <style type="text/css">
      canvas {
        border: 1px solid black;
      }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="150" height="150"></canvas>
  </body>
</html>
```

上面的脚本中包含一个叫做 draw()的函数，当页面加载结束的时候就会执行这个函数。通过使用在文档上加载事件来完成。<br>
只要页面加载结束，这个函数，或者像是这个的，同样可以使用 window.setTimeout() ， window.setInterval()，或者其他任何事件处理程序来调用。

# [使用 canvas 来绘制图形](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

## 栅格

在我们开始画图之前，我们需要了解一下画布栅格（canvas grid）以及坐标空间。上一页中的 HTML 模板中有个宽 150px, 高 150px 的 canvas 元素。<br>
如右图所示，canvas 元素默认被网格所覆盖。通常来说网格中的一个单元相当于 canvas 元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。<br>
图中蓝色方形左上角的坐标为距离左边（X 轴）x 像素，距离上边（Y 轴）y 像素（坐标为（x,y））。
![栅格](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)

## 绘制矩形

`<canvas>` 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。<br>
canvas 提供了三种方法绘制矩形：

- [fillRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect)
  绘制一个填充的矩形

```JS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(20, 10, 150, 100);
```

<p><iframe class="sample-code-frame" title="结果" id="frame_A_simple_filled_rectangle" width="700" height="180" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect/_sample_.A_simple_filled_rectangle.html" loading="lazy"></iframe></p>
- [strokeRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect)
  绘制一个矩形的边框

```JS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'green';
ctx.strokeRect(20, 10, 160, 100);
```

<p><iframe class="sample-code-frame" title="一个简单的填充矩形 sample" id="frame_一个简单的填充矩形" width="700" height="180" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect/_sample_.%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84%E5%A1%AB%E5%85%85%E7%9F%A9%E5%BD%A2.html" loading="lazy"></iframe></p>

- [clearRect(x, y, width, height)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)

清除指定矩形区域，让清除部分完全透明

```JS
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 绘制黄色背景
ctx.beginPath();
ctx.fillStyle = '#ff6';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 绘制蓝色三角形
ctx.beginPath();
ctx.fillStyle = 'blue';
ctx.moveTo(20, 20);
ctx.lineTo(180, 20);
ctx.lineTo(130, 130);
ctx.closePath();
ctx.fill();

// 清除一部分画布
ctx.clearRect(10, 10, 120, 100);

```

<p><iframe class="sample-code-frame" title="清除一部分画布" id="frame_Erasing_part_of_a_canvas" width="700" height="180" src="https://yari-demos.prod.mdn.mozit.cloud/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect/_sample_.Erasing_part_of_a_canvas.html" loading="lazy"></iframe></p>

## [绘制路径](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

- 首先，你需要创建路径起始点。
- 然后你使用画图命令去画出路径。
- 之后你把路径封闭。
- 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

以下是所要用到的函数：

- beginPath()
  新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- closePath()
  闭合路径之后图形绘制命令又重新指向到上下文中。
- stroke()
  通过线条来绘制图形轮廓。
- fill()
  通过填充路径的内容区域生成实心的图形。

生成路径的第一步叫做 beginPath()。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

```JS
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}
```

![s](https://mdn.mozillademos.org/files/9847/triangle.png)

### [移动笔触](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

`moveTo(x, y)`
将笔触移动到指定的坐标 x 以及 y 上。

当`canvas`初始化或者`beginPath()`调用后，你通常会使用`moveTo()`函数设置起点。我们也能够使用`moveTo()`绘制一些不连续的路径。看一下下面的笑脸例子。我将用到`moveTo()`方法（红线处）的地方标记了。

```JS
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);   // 口(顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
    ctx.stroke();
  }
}
```

![a](https://mdn.mozillademos.org/files/252/Canvas_smiley.png)

### 线

绘制直线，需要用到的方法`lineTo()`。
[lineTo(x, y)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineTo)
绘制一条从当前位置到指定 x 以及 y 位置的直线。

```JS
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
  var ctx = canvas.getContext('2d');

  // 填充三角形
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // 描边三角形
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
  }
}
```

![a](https://mdn.mozillademos.org/files/238/Canvas_lineTo.png)

正如上面所提到的，因为路径使用填充（`fill`）时，路径自动闭合，使用描边（`stroke`）则不会闭合路径。如果没有添加闭合路径`closePath()`到描述三角形函数中，则只绘制了两条线段，并不是一个完整的三角形。

### 圆弧

- [arc(x, y, radius, startAngle, endAngle, anticlockwise)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc)
  画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。

- [arcTo(x1, y1, x2, y2, radius)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arcTo)
  根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

arc()函数中表示角的单位是弧度，不是角度。角度与弧度的 js 表达式:
弧度=(Math.PI/180)\*角度。

```JS
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        ctx.beginPath();
        var x = 25 + j * 50; // x 坐标值
        var y = 25 + i * 50; // y 坐标值
        var radius = 20; // 圆弧半径
        var startAngle = 0; // 开始点
        var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
        var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1){
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}
```

![s](https://mdn.mozillademos.org/files/204/Canvas_arc.png)

### [二次贝塞尔曲线及三次贝塞尔曲线](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

- quadraticCurveTo(cp1x, cp1y, x, y)
  绘制二次贝塞尔曲线，cp1x,cp1y 为一个控制点，x,y 为结束点。

- bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
  绘制三次贝塞尔曲线，cp1x,cp1y 为控制点一，cp2x,cp2y 为控制点二，x,y 为结束点。

右边的图能够很好的描述两者的关系，二次贝塞尔曲线有一个开始点（蓝色）、一个结束点（蓝色）以及一个控制点（红色），而三次贝塞尔曲线有两个控制点。
![s](https://mdn.mozillademos.org/files/223/Canvas_curves.png)

二次贝塞尔曲线

```JS
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // 二次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
   }
}
```

![s](https://mdn.mozillademos.org/files/243/Canvas_quadratic.png)

三次贝塞尔曲线

```JS
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

     //三次贝塞尔曲线
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();
  }
}
```

![s](https://mdn.mozillademos.org/files/207/Canvas_bezier.png)

### 组合使用

```JS
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    roundedRect(ctx, 12, 12, 150, 150, 15);
    roundedRect(ctx, 19, 19, 150, 150, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);

    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(31, 37);
    ctx.fill();

    for(var i = 0; i < 8; i++){
      ctx.fillRect(51 + i * 16, 35, 4, 4);
    }

    for(i = 0; i < 6; i++){
      ctx.fillRect(115, 51 + i * 16, 4, 4);
    }

    for(i = 0; i < 8; i++){
      ctx.fillRect(51 + i * 16, 99, 4, 4);
    }

    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

// 封装的一个用于绘制圆角矩形的函数.

function roundedRect(ctx, x, y, width, height, radius){
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.stroke();
}
```

## [path2D](https://developer.mozilla.org/zh-CN/docs/Web/API/Path2D/Path2D)

`Path2D()`会返回一个新初始化的 Path2D 对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含 SVG path 数据的字符串作为变量）。

```JS
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}
```

# [使用样式和颜色](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors)

- [fillStyle = color](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle)
  设置图形的填充颜色。

```JS
var ctx = document.getElementById('canvas').getContext('2d');
for (var i=0;i<6;i++){
  for (var j=0;j<6;j++){
    ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' +
                     Math.floor(255-42.5*j) + ',0)';
    ctx.fillRect(j*25,i*25,25,25);
  }
}
```

![s](https://mdn.mozillademos.org/files/5417/Canvas_fillstyle.png)

- [strokeStyle = color](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle)
  设置图形轮廓的颜色。

```JS
var ctx = document.getElementById('canvas').getContext('2d');
for (var i=0;i<6;i++){
  for (var j=0;j<6;j++){
    ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' +
                      Math.floor(255-42.5*j) + ')';
    ctx.beginPath();
    ctx.arc(12.5+j*25,12.5+i*25,10,0,Math.PI*2,true);
    ctx.stroke();
  }
}
```

![s](https://mdn.mozillademos.org/files/253/Canvas_strokestyle.png)

## 透明度 Transparency

- [globalAlpha = transparencyValue](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalAlpha)
  这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。<br>

因为 strokeStyle 和 fillStyle 属性接受符合 CSS 3 规范的颜色值，那我们可以用下面的写法来设置具有透明度的颜色。

```JS
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

### globalAlpha 示例

```JS
var ctx = document.getElementById('canvas').getContext('2d');

// draw background
ctx.fillStyle = '#FD0';
ctx.fillRect(0,0,75,75);
ctx.fillStyle = '#6C0';
ctx.fillRect(75,0,75,75);
ctx.fillStyle = '#09F';
ctx.fillRect(0,75,75,75);
ctx.fillStyle = '#F30';
ctx.fillRect(75,75,75,75);
ctx.fillStyle = '#FFF';

// set transparency value
ctx.globalAlpha = 0.2;

// Draw semi transparent circles
for (i=0;i<7;i++){
  ctx.beginPath();
  ctx.arc(75,75,10+10*i,0,Math.PI*2,true);
  ctx.fill();
}
```

![s](https://mdn.mozillademos.org/files/232/Canvas_globalalpha.png)

### rgba() 示例

```JS
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  // 画背景
  ctx.fillStyle = 'rgb(255,221,0)';
  ctx.fillRect(0,0,150,37.5);
  ctx.fillStyle = 'rgb(102,204,0)';
  ctx.fillRect(0,37.5,150,37.5);
  ctx.fillStyle = 'rgb(0,153,255)';
  ctx.fillRect(0,75,150,37.5);
  ctx.fillStyle = 'rgb(255,51,0)';
  ctx.fillRect(0,112.5,150,37.5);

  // 画半透明矩形
  for (var i=0;i<10;i++){
    ctx.fillStyle = 'rgba(255,255,255,'+(i+1)/10+')';
    for (var j=0;j<4;j++){
      ctx.fillRect(5+i*14,5+j*37.5,14,27.5)
    }
  }
}
```

![s](https://mdn.mozillademos.org/files/246/Canvas_rgba.png)

## [线型 Line styles](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#line_styles)

### [图案样式 Patterns](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#patterns)

### [阴影 Shadows](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#%E9%98%B4%E5%BD%B1_shadows)

### [Canvas 填充规则](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#canvas_fill_rules)

# [绘制文本](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_text)

## [绘制文本](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_text#%E7%BB%98%E5%88%B6%E6%96%87%E6%9C%AC)

canvas 提供了两种方法来渲染文本:

- [fillText(text, x, y [, maxWidth])](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillText)
  在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
- [strokeText(text, x, y [, maxWidth])](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeText)
  在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.

```JS
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
}
```
# [使用图像 Using images](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images)
