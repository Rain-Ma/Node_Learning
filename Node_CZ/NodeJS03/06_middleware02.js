
var express = require('express');

var app = express();

var a = 100;

app.get('/', function (req, res) {
  a++;
  res.send(a.toString()); // 同样会自增
});

app.listen(3000, function () {
  console.log('监听端口号: 3000');
})

