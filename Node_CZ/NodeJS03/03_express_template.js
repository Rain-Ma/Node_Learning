var express = require('express');

var app = express();

// 在应用中加载模板引擎模块，Express 已经在内部加载，
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  // res.render()渲染模板
  res.render('haha', {
    "news": ['iOS', 'JAVA', 'HTML', 'CSS']
  }); //可以省略haha.ejs的后缀名
});

app.listen(3000, function () {
  console.log('监听端口号: 3000');
})