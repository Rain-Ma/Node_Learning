/***
 * 使用express创建一个服务器
 */

var express = require('express');

// app 是 express 对象的一个实例
var app = express();

// 访问静态文件
app.use(express.static('./public'));

// 和路由不冲突, 前提public里面没有haha文件
app.get('/haha', function (req, res) {
  res.send('haha');
})


app.listen(3000, function () {
  console.log('监听端口号: 3000');
});