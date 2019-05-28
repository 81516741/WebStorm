let http = require('http')
let utils = require('util')

http.get("http://localhost:3002/index.html",(res)=>{
  let data = '';
  res.on("data",(tempData)=>{
    data = data + tempData;
  });
  res.on("end",()=>{
    // let result = JSON.parse(data);
    console.log(utils.inspect(data.toString()));
  });
})
