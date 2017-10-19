
var express = require('express');
var db = require('./model/db');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

// 显示留言列表
app.get('/', function (req, res) {

  res.render('index');

});

app.listen(3000, function () {
  console.log('监听端口号: 3000');
})