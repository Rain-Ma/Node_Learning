
var express = require('express');
var fs = require('fs');

var app = express();

app.use(haha);

app.get('/admin', function (req, res) {;
  res.send('管理员');
});


// 静态资源的服务, 缺点: 返回的MIME类型不正确.
function haha(req, res, next) {
  // 根据当前的网址, 读取public文件夹中的文件
  // 如果有这个文件, 那么渲染这个文件
  // 如果没有这个文件, 那么next();

  var filePath = req.originalUrl;
  fs.readFile('./public' + filePath, function (err, data) {
    if (err) {
      // 文件不存在
      next();
      return;
    }

    res.send(data.toString());
  });


}







app.listen(3000, function () {
  console.log('监听端口号: 3000');
})
