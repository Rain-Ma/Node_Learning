/***
 * 使用express创建一个服务器
 */

var express = require('express');

// app 是 express 对象的一个实例
var app = express();

app.get('/', function (req, res) {
  res.send('hello world');
});

app.get('/about', function (req, res) {
  res.send('这是介绍页面');
})

// TODO: 正则
app.get(/^\/student\/([\d]{10})$/, function (req, res) {
  // http://localhost:3000/student/1234567890 学号必须是10位
  res.send('学生信息, 学号' + req.params[0]);
});

app.get('/teacher/:gonghao', function (req, res) {
  // /teacher/:gonghao 字符串中的 : 是express提供的, 后面的值可以被req获取到.
  // 这是字符串模式

  // req.param() 方法过时
  // res.send('老师工号: ' + req.params['gonghao']);
  res.send('老师工号: ' + req.params.gonghao);
});



app.listen(3000, function () {
  console.log('监听端口号: 3000');
});