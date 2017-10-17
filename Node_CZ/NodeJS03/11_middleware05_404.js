
var express = require('express');

var app = express();

app.use('/jingtai', express.static('./public'));


app.get('/images', function (req, res) {
    res.send('haha');
});


// express 会自带一个404的处理页面.
// 也可以自定义404
app.use(function (req, res) {
  res.send('没有这个页面'); // 自定义404
});


app.listen(3000, function () {
  console.log('监听端口号: 3000');
})
