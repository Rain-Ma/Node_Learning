
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {

  var path = url.parse(req.url); // url.parse() 方法会解析一个 URL 字符串并返回一个 URL 对象。
  // console.log('path:', path);
  // console.log('pathname: ', path.pathname);
  // console.log('hash', path.hash);
  console.log('query: ', path.query);
  console.log('search: ', path.search);
  path.search = 'abc=xyz'; // 根据文档设置, 但是结果和文档不同.
  console.log('href: ', path.href);
  // console.log('searchParams: ', path.searchParams); // 文档中有这个API, 但是实际环境中不识别.

  // 后面加上true, 那么获取到的query属性是对象, 而不是字符串.
  var pathObject = url.parse(req.url, true);
  console.log('query obj id: ', pathObject.query.id);

  res.end('success');

});

server.listen(3000, function () {
  console.log('监听端口号: 3000');
})
