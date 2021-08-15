// 简单小程序
function simpleServer() {
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
}

//根据不同请求响应不同内容
function difRequest() {
  var http = require("http");
  http
    .createServer(function (req, res) {
      if (req.url === "/" || req.url === "/index") {
        res.end("Hello Index");
        //相当于调用 res.write(),后调用res.end()
      } else {
        res.end("Error");
      }
    })
    .listen(3000, () => {
      console.log("http://localhost:3000");
    });
}

// 根据不同内容响应不同html
function difHtml() {
  var http = require("http");
  var fs = require("fs");
  var path = require("path");
  http
    .createServer(function (req, res) {
      //   res.setHeader("Content-Type", "text/html;charset=utf-8");
      if (req.url === "/" || req.url === "/index") {
        fs.readFile(
          path.join(__dirname, "template", "index.html"),
          function (err, data) {
            if (err) {
              throw err;
            } else {
              res.end(data);
            }
          }
        );
      } else {
        fs.readFile(
          path.join(__dirname, "template", "Error.html"),
          function (err, data) {
            if (err) {
              throw err;
            } else {
              res.end(data);
            }
          }
        );
      }
    })
    .listen(3000, () => {
      console.log("http://localhost:3000");
    });
}

// 加载具有图片的html
function difHtmlPic() {
  var http = require("http");
  var fs = require("fs");
  var path = require("path");
  http
    .createServer(function (req, res) {
      //   res.setHeader("Content-Type", "text/html;charset=utf-8");
      if (req.url === "/" || req.url === "/index") {
        fs.readFile(
          path.join(__dirname, "template", "index.html"),
          function (err, data) {
            if (err) {
              throw err;
            } else {
              res.end(data);
            }
          }
        );
      } else if (req.url === "/picture") {
        fs.readFile(
          path.join(__dirname, "template", "picture.html"),
          function (err, data) {
            if (err) {
              throw err;
            } else {
              res.end(data);
            }
          }
        );
      } else if (req.url === "/static/1.png") {
        fs.readFile(
          path.join(__dirname, "static", "1.png"),
          function (err, data) {
            if (err) {
              throw err;
            } else {
              res.setHeader("Content-Type", "image/png");
              res.end(data);
            }
          }
        );
      } else if (req.url === "/css") {
        fs.readFile(
          path.join(__dirname, "template", "css.html"),
          function (err, data) {
            if (err) {
              throw err;
            } else {
              res.end(data);
            }
          }
        );
      } else if (req.url === "/static/css.css") {
        fs.readFile(
          path.join(__dirname, "static", "css.css"),
          function (err, data) {
            if (err) {
              throw err;
            } else {
              res.setHeader("Content-Type", "text/css");
              res.end(data);
            }
          }
        );
      } else {
        fs.readFile(
          path.join(__dirname, "template", "Error.html"),
          function (err, data) {
            if (err) {
              throw err;
            } else {
              res.end(data);
            }
          }
        );
      }
    })
    .listen(3000, () => {
      console.log("http://localhost:3000");
    });
}

// 模拟Apache服务器
function likeApache() {
  var http = require("http");
  var path = require("path");
  var mime = require("mime");
  //   mime.getType()能够获取文件类型的Content-type对应属性
  // mime.getExtension()能够获取文件Content-type属性的文件类型
  var fs = require("fs");

  http
    .createServer(function (req, res) {
      var url = path.join(__dirname, req.url);
      var type = mime.getType(url);
      if (type != null) {
        fs.readFile(url, function (err, data) {
          if (err) {
            console.log("文件未找到");
          } else {
            res.setHeader("Content-Type", type);
            res.end(data);
          }
        });
      } else {
        fs.readFile(
          path.join(__dirname, "template", req.url + ".html"),
          function (err, data) {
            if (err) {
              fs.readFile(
                path.join(__dirname, "template", "Error.html"),
                function (err, data) {
                  if (err) {
                    throw err;
                  } else {
                    res.setHeader("Content-Type", "text/html");
                    res.end(data);
                  }
                }
              );
            } else {
              res.setHeader("Content-Type", "text/html");
              res.end(data);
            }
          }
        );
      }
    })
    .listen(3000, () => {
      console.log("http://localhost:3000");
    });
}
likeApache();
