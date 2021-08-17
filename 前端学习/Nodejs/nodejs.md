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

# 实例测试

<p style="background-color:#ffb; padding:10px">注意：url仅仅为一标识符，跟文件类型无关，‘/index.html’未必表示返回一个html页面</p>

# [Request](http://nodejs.cn/api/http.html#http_class_http_clientrequest)[1](http://nodejs.cn/api/http.html#http_http_request_options_callback)

`request`：服务器解析用户提交的 http 请求报文，将结果解析到`request`对象中.凡是要获取和用户请求相关的数据都可以通过`request`对象获取。

- request.method 请求的方法
- request.host 请求的方法
- message.headers 标头名称和值的键值对。
- message.rawHeaders 键和值在同一个列表中。
- message.httpVersion 在服务器请求的情况下，客户端发送的 HTTP 版本。 在客户端响应的情况下，连接到服务器的 HTTP 版本。
- message.url 请求的网址字符串。 这仅包含实际 HTTP 请求中存在的网址。

# [Response](http://nodejs.cn/api/http.html#http_class_http_serverresponse)

`response`：服务器端用来向用户做出响应的都西昂。凡是需要向用户响应的操作，都可以通过`response`对象操作。

- outgoingMessage.write(chunk[, encoding][, callback]) chunk 可以是字符串或缓冲区。 当 chunk 为字符串时，则 encoding 参数指定如何将 chunk 编码为字节流。 callback 将在 chunk 被刷新时被调用。
- response.end([data[, encoding]][, callback]) 此方法向服务器发出信号，表明所有响应头和正文都已发送；该服务器应认为此消息已完成。 response.end() 方法必须在每个响应上调用。

  如果指定了 data，则其效果类似于调用 response.write(data, encoding) 后跟 response.end(callback)。
- response.writeHead(statusCode[, statusMessage][, headers]) 向请求发送响应头。 状态码是 3 位的 HTTP 状态码，如 404。 最后一个参数 headers 是响应头。 可选地给定人类可读的 statusMessage 作为第二个参数。

```JS
const body = 'hello world';
response
  .writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain'
  })
  .end(body);
```

当标头已使用 response.setHeader() 设置时，则它们将与任何传给 response.writeHead() 的标头合并，其中传给 response.writeHead() 的标头优先。

- response.statusCode 使用隐式标头（不显式调用 response.writeHead()）时，此属性控制在标头刷新时将发送到客户端的状态码。
- response.statusMessage 当使用隐式标头（不显式调用 response.writeHead()）时，此属性控制在标头刷新时将发送到客户端的状态消息。 如果保留为 undefined，则将使用状态码的标准消息。


# [package.json](https://www.npmjs.cn/files/package.json/)
项目描述文件
