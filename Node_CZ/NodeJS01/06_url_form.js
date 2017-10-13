
var http = require('http');
var url = require('url');
var server = http.createServer(function (req, res) {
  // 获取到查询部分
  var queryObj = url.parse(req.url, true).query;
  var name = queryObj.name;
  var age = queryObj.age;
  var sex = queryObj.sex;
  res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
  res.end('服务器收到了表单请求' + name + age + sex);

});

server.listen(3000, function () {
  console.log('监听端口号: 3000');
});






