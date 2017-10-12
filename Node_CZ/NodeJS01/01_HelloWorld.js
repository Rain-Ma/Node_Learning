
var http = require("http");

// 创建服务器, 回调函数参数表示如果有请求进来, 要做什么.
var server = http.createServer(function (req, res) {
  // req表示请求, request; res 表示响应, response
  // 设置HTTP头部, 状态码是200, 文件类型是html, 字符集是utf8
  res.writeHead(200, {"Content-type": "test/html;charset=UTF-8"});
  res.end('这是我的第一个Node页面');
});

//  运行服务器, 监听3000端口
server.listen(3000, function () {
  console.log('监听端口号3000');
});



