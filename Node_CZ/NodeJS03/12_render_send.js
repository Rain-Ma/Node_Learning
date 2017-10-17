
var express = require('express');
var app = express();

app.set('views', 'template'); // 设置template目录是存放模板的目录.
app.set('view engine', 'ejs'); // 设置模板引擎.

app.get('/', function (req, res) {

  res.render('index', {name: 'Tom'});

});

// res.send()只能用一次, 和res.end()一样, 但是res.send()可以自动设置响应头, 而res.end()不可以.
app.get('/check', function (req, res) {
  // res.send({'user': 'ok'});
  res.send('你好');
});
app.listen(3000, function () {
  console.log('监听端口号: 3000');
});


