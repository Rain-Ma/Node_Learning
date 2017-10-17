
var express = require('express');

var app = express();

app.use('/', function (req, res, next) {
  var date = new Date();
  res.write(date.toDateString());
  next();
});


// http://localhost:3000/admin/aa/bb/cc
app.use('/admin', function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.write(req.originalUrl + '\n'); //  /admin/aa/bb/cc

  res.write(req.baseUrl + '\n');//    /admin

  res.write(req.path + '\n'); //   /aa/bb/cc

  res.end('你好');
});





app.listen(3000, function () {
  console.log('监听端口号: 3000');
})
