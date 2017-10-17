
var express = require('express');

var app = express();

app.use('/jingtai', express.static('./public'));


app.get('/images', function (req, res) {
    res.send('haha');
});


// express 会自带一个404的处理页面.
// 也可以自定义404
// 会自动识别err参数, 如果有, 那么这个函数可以捕获err
app.use(function (err, req, res) { // TODO: 视频中出现了问题, 没有解决.
  if (err) {    res.send('没有这个页面');
  }
})


app.listen(3000, function () {
  console.log('监听端口号: 3000');
})
