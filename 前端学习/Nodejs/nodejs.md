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

<p style="background-color:#ffb; padding:10px">异步操作无法用try-catch捕获错误，只能使用err.code错误码捕获错误</p>
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

`./`表示的是执行 node 命令的路径，而不是相对于执行 JS 文件的路径<br>
解决：

- \_\_dirname:表示当前正在执行的 js 文件所在目录
- \_\_filename:表示当前正在执行的 js 文件所在的完整路径

# [Path](http://nodejs.cn/api/path.html#path_path_join_paths)

## [fs 创建文件夹](http://nodejs.cn/api/fs.html#fs_fs_mkdir_path_options_callback)

```JS
var fs=require('fs')
fs.mkdir('test_dir',function(err){
  if(err){
    throw err
  }else{
    console.log('文件夹创建成功')
  }
})
```

<p style="background-color:#ffb; padding:10px">nodejs 为first-err程序，即所有API接口的第一个返回值均为err, 若执行成功即为None</p>

# [HTTP 超文本协议](http://nodejs.cn/api/http.html#http_http)

```JS
// 导入包
var http = require("http");
// 创建http对象
var server = http.createServer();
// 监听http请求事件

//
server.on("request", function (req, res) {
  // request 请求路径
  // req 为请求报文，用户提交过来的数据
  // res 返回请求体，服务器响应数据

  //   解决乱码
  // text/plain表示纯文本，text/html 表示html，告诉浏览器解析方式
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.write("succes 你好");
  //   对每一个请求，必须结束响应，不然服务器会一直等待响应

  res.end();
});

server.listen(3000, () => {
  console.log("my first server bound:http://localhost:3000");
});

```

## [InComingMessage 对象](http://nodejs.cn/api/http.html#http_class_http_incomingmessage)

```JS
var http=require('http')

var server=http.createServer();
server.on("request",function(req,res){
res.end()
})
server.listen(3000,()=>{

})

```

req 表示请求对象，一般包含内容：

```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
Connection: keep-alive
Cookie: _xsrf=2|288815f8|2352bc57b0f9c4fef0b74eedb84b66cc|1627373309; username-localhost-8888="2|1:0|10:1627373371|23:username-localhost-8888|44:ZTIzZTdiYjU3MGIzNDM1Yzg4Yzc1YjExMGQwZWE4NzM=|d8cb754b3982fa770a573c03281e5119045e75e5db54d844bd77f17a8ee91535"
Host: localhost:3000
sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"
sec-ch-ua-mobile: ?0
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
```

该对象可通过 Rquest 方法设置值

## [OutGoingMessage 对象](http://nodejs.cn/api/http.html#http_class_http_outgoingmessage)

```JS
var http=require('http')

var server=http.createServer();
server.on("request",function(req,res){
res.end()
})
server.listen(3000,()=>{

})
```

其中，res 表示服务器响应，一般包含：

```
Connection: keep-alive
Content-Type: text/plain;charset=utf-8
Date: Sun, 15 Aug 2021 08:55:36 GMT
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

可通过 Response 对象修改值

## 

<p style="background-color:#ffb; padding:10px">注意：url仅仅为一标识符，跟文件类型无关，‘/index.html’未必表示返回一个html页面</p>