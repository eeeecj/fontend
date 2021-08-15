var fs = require("fs");
var msg = "Hello World";
fs.writeFile("hello.txt", msg, (err) => {
  if (err) throw err;
  console.log("this file has been saved");
});

fs.readFile("hello.txt","utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
