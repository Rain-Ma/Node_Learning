/**
 * 探求事件循环机制
 * 想要说明的是, 当很多用户去访问的时候,
 */

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {

  var userId = parseInt(Math.random() * 89999) + 10000;
  console.log('欢迎' + userId);

  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

  // ./test/08_fs.txt 同级路径必须写 ./ , 这是Linux的写法, 为了跨平台.(windows下面可以不写)
  // 回调函数表示文件读取成功之后的操作
  fs.readFile('./test/08_fs.txt',{'charset': 'utf-8'}, function (err, data) { // 第一个参数必须是err
    if (err) {
      throw err; // 抛出错误后, 后面的语句将不会执行.
    }
    console.log(userId + '文件读取成功');
    res.end(data);
  })
  
});

server.listen(3000, function () {
  console.log('监听端口: 3000');
});
