
var http = require('http');


var a= 100; // 这个语句只在打开服务器的时候, 执行一次. 用户每次访问的时候不执行
var server = http.createServer(function (req, res) {
  a++; // TODO 问每次访问的时候a的值是101, 还是会一直递增
  res.end(a.toString()); // 无论网页如何刷新, a的值会一直递增, 说明刷新网页不会重新执行文件, 而是执行这个回调函数, 除非重启服务器.
});

server.listen(3000, function () {
  console.log('监听端口号: 3000');
});

