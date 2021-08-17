var http = require("http");
var path = require("path");
var fs = require("fs");
var mime = require("mime");
var _ = require("underscore");
var querystring = require("querystring");
var url = require("url");

http
  .createServer(function (req, res) {
    // 设计路由
    // 1、 当用户请求/ 、/index，方式请求显示新闻列表 -get
    // 2、当用户请求/item，显示新闻详情 -get
    // 3、当用户请求/submit时,显示添加新闻页面 -get
    // 4、当用户请求/add时,将用户提交的新闻保存到data.json文件中 -get
    // 5、当用户请求/add时,将用户提交的新闻列表保存到data.json文件中 -post

    req.url = req.url.toLowerCase();
    req.method = req.method.toUpperCase();

    res.render = function (filename, tempData) {
      fs.readFile(filename, function (err, data) {
        if (err) {
          res.writeHead(404, "Not Found", { "content-type": "text/plain" });
          res.end("404 Not Found");
        } else {
          if (tempData) {
            var fn = _.template(data.toString("utf-8"));
            data = fn(tempData);
          }
          res.setHeader("content-type", mime.getType(filename));
          res.end(data);
        }
      });
    };
    if (req.url === "/" || (req.url === "/index" && req.method === "GET")) {
      // 首页
      readNewData(function (data) {
        res.render(path.join(__dirname, "template", "index.html"), {
          list: data,
        });
      });
    } else if (req.url.startsWith("/items") && req.method === "GET") {
      // 详情页

      readNewData(function (data) {
        var urlobj = new URL(req.url, "http://localhost:3000/");
        var searchParams = urlobj.searchParams;
        var postdata = data.find((element) => {
          if (element.id.toString() === searchParams.get("id").toString()) {
            return true;
          }
        });
        res.render(path.join(__dirname, "template", "item.html"), {
          item: postdata,
        });
      });
    } else if (req.url === "/submit" && req.method === "GET") {
      // 提交页
      res.render(path.join(__dirname, "template", "submit.html"));
    } else if (req.url.startsWith("/add") && req.method === "GET") {
      var urlobj = new URL(req.url, "http://localhost:3000/");
      var searchParams = {};
      for (const key of urlobj.searchParams.keys()) {
        searchParams[key] = urlobj.searchParams.get(key);
      }
      readNewData(function (list) {
        searchParams.id = list.length;
        list.push(searchParams);
        writeNewdata(JSON.stringify(list, "utf-8"), function () {
          res.writeHead(302, "Found", { Location: "/" });
          res.end();
        });
      });
      res.end();
    } else if (req.url === "/add" && req.method === "POST") {
      readNewData(function (list) {
        postDataFunc(function (postContent) {
          postContent.id = list.length;
          list.push(postContent);
          writeNewdata(JSON.stringify(list, "utf-8"), function () {
            res.writeHead(302, "Found", { Location: "/" });
            res.end();
          });
        });
      });
    } else if (req.url.startsWith("/static") && req.method === "GET") {
      // 读取静态资源
      res.render(path.join(__dirname, req.url));
    } else {
      fs.readFile(
        path.join(__dirname, "template", "404.html"),
        function (err, data) {
          if (err) {
            throw err;
          }
          res.setHeader("content-type", "text/html");
          res.end(data);
        }
      );
    }
  })
  .listen(3000, () => {
    console.log("http://localhost:3000");
  });
function readNewData(callback) {
  fs.readFile(path.join(__dirname, "data.json"), "utf8", function (err, data) {
    if (err && err.code !== "ENOENT") {
      throw err;
    }
    var list = JSON.parse(data || "[]");
    callback(list);
  });
}

function writeNewdata(data, callback) {
  fs.writeFile(path.join(__dirname, "data.json"), data, function (err) {
    if (err && err.code !== "ENOENT") {
      throw err;
    }
    callback();
  });
}

function postDataFunc(req, callback) {
  var array = [];
  req.on("data", function (chunk) {
    array.push(chunk);
  });
  req.on("end", function () {
    var postData = Buffer.concat(array);
    postData = postData.toString("utf8");
    postData = querystring.parse(postData);
    callback(postData);
  });
}
