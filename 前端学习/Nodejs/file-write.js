// const fs = require("fs");
// var msg = "Hello";
// console.log("111")
// fs.writeFile("hello.txt", msg, "utf-8", function (err) {
//   // 如果文件写入成功 err==null
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("写入文件成功");
//   }
// });
// console.log("222")
console.log("111")

setTimeout(function(){
  console.log("222")
},1000)

console.log("333")

setTimeout(function(){
  console.log("444")
},0)

console.log("555")