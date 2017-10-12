/**
 * 简单讲解http模块
 */

// 引用模块
var http = require("http");

/**
 * 创建一个服务器, 回调函数表示接收到请求之后做的事情
 */
var server = http.createServer(function (req, res) {
  // req参数表示请求, res表示响应

  console.log('服务器接收的请求' + req.url);

  // res.setHeader('Content-Type', 'text/plain;charset=utf-8');

  // writeHead方法和setHeader方法.
  // response.setHeader() 设置的响应头会与 response.writeHead() 设置的响应头合并，且 response.writeHead() 的优先。
  res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'}); // plain 代表纯文本

  res.write('<h1>我是一级标题</h1>');
  res.write('<h2>我是二级标题</h2>'); // 不能在end()之后写

  // 该方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。 每次响应都必须调用
  res.end('<h1>我是一个主题</h1>'); // 如果不写end(), 浏览器会一直在请求, 直到超时.

  // 注意 write() 和 end() 的参数类型必须是  <string> | <Buffer>

});

server.listen(3000, function () {
  console.log('监听端口: 3000');
});




