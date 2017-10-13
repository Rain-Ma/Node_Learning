
var http = require('http');

var server = http.createServer(function (req, res) {
  console.log(req.url);
  res.end('success');
});

server.listen(3000, function () {
  console.log('监听端口号: 3000');
})


