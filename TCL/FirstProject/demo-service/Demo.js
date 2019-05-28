let user = require('./User')
let name = user.getName();
console.log(`${name}对对对${user.userName}`);


// 服务内容
let HTTP = require('http')
let url = require('url')
let util = require('util')
let fs = require('fs')

let service =  HTTP.createServer((req,res)=>{
  // res.statusCode = 200;
  // res.setHeader("Content-Type","text/plain;charset=utf-8");
  console.log("url" + req.url);
  console.log(util.inspect(url.parse(req.url)));

  var path = url.parse(req.url).pathname;
  fs.readFile(path.substring(1),(err,data)=>{
    console.log(data);
    if (err) {
      res.setHeader("404",{
        "Content-Type":"text/html"
      });
    } else {
      res.setHeader("200",{
        "Content-Type":"text/html"
      });
      res.end(data)
    }
  })
})
service.listen(3002,'127.0.0.1',()=>{
  console.log("已经启动服务")
})
