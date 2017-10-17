
var express = require('express');
var fs = require('fs');

var app = express();

// 静态资源服务器, 解决了MIME类型的问题
// app.use(express.static('./public')); // 通常情况下, use放在get前面, 这样可以避免 get中的路径和use中的路径发生冲突.

// http://localhost:3000/jingtai/ 只有这样才能访问到 public下的index.html文件. 不会影响到前端, 因为前端使用的是相对路径.
app.use('/jingtai', express.static('./public'));


app.get('/images', function (req, res) {
    // 在public路径下, 有一个images
    // 如果use 在 get下面, 那么就会匹配get中的路径, 而不会匹配到use的public下的images了
  res.send('haha');
});

app.get('/admin', function (req, res) {
  res.send('管理员');
});



app.listen(3000, function () {
  console.log('监听端口号: 3000');
})
