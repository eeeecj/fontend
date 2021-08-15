# 介绍

nodejs 是一个开发平台，使用 javascript 编程语言，基于 chrome V8 javascript 运行环境，可开发控制台命令行程序、桌面应用程序、web 应用程序。

## 特点

- 事件驱动
- 非阻塞 I/O
- 单线程
- npm

# [安装](http://nodejs.cn/learn/how-to-install-nodejs)

# 书写代码方式

新建 JS 文件，书写代码

- 不建议以中文命名
- 不出现 node 关键字
- 不包含空格
- 建议以 ‘-’分隔单词

## 执行代码

在 JS 文件目录下，cmd 命令行输入

```javascript
node helloword.js
```

# [全局模块](http://nodejs.cn/api/globals.html)

### 文件写入实例

[`fs.writeFile()`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback)

```javascript
const fs = require("fs");
var msg = "Hello";
fs.writeFile("hello.txt", msg, "utf-8", function (err) {
  // 如果文件写入成功 err==null
  if (err) {
    console.log(err);
  } else {
    console.log("写入文件成功");
  }
});
```

### 单线程非阻塞 I/O

1. 示例一

```javascript
const fs = require("fs");
var msg = "Hello";
console.log("111");
fs.writeFile("hello.txt", msg, "utf-8", function (err) {
  // 如果文件写入成功 err==null
  if (err) {
    console.log(err);
  } else {
    console.log("写入文件成功");
  }
});
console.log("222");
```

输出结果：

```
111
222
写入文件成功
```

2. 示例二

```javascript
console.log("111");

setTimeout(function () {
  console.log("222");
}, 1000);

console.log("333");

setTimeout(function () {
  console.log("444");
}, 0);

console.log("555");
```

输出结果：

```
111
333
555
444
222
```
### 文件读取
```JS
const fs=require("fs")
fs.readFile("./hello.txt","utf-8",function( err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})
```
`./`表示的是执行node命令的路径，而不是相对于执行JS文件的路径<br>
解决：
- __dirname:表示当前正在执行的js文件所在目录
- __filename:表示当前正在执行的js文件所在的完整路径
# Path

## fs创建文件夹

<p style="background-color:#fe9; padding:10px">nodejs 为first-err程序，即所有API接口的第一个返回值均为err, 若执行成功即为None</p>