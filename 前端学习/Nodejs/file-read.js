const fs=require("fs")
fs.readFile(__dirname+"/hello.txt","utf-8",function( err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})