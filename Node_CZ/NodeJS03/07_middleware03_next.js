
var express = require('express');

var app = express();


app.get('/', function (req, res, next) {
  console.log(1);
  res.send('1');
  next() // 在路径相同的情况下, 调用next参数才能匹配下面的路由.

});

app.get('/', function (req, res) {
  console.log(2);
  // res.send('2'); // 当匹配这个路由的时候, 再一次send了, 和第一次的send()会发生冲突, 所以在第一个路由中要进行判断.
})

app.listen(3000, function () {
  console.log('监听端口号: 3000');
})

