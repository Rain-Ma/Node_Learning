/**
 * 作业:
 *   编写一个静态资源文件管理服务器.
 *   根据mime.json文件中的数据, 编写获取MIME类型的函数.
 * */

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function (req, res) {

  // 获取路径
  var pathname = url.parse(req.url).pathname;
  // 如果路径是根路径, 则赋值为index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // 获取文件后缀名
  var extname = path.extname(pathname);

  // 读取路径对应的文件
  fs.readFile('./static' + pathname, function (err, data) {
    if (err) { // 出错就返回404
      res.writeHead(404, {'Content-Type': 'text/html'});

      fs.readFile('./static/404.html', function (err, data) {
        res.end(data);
      });
      return;
    }

    // 获取mime类型
    getMIME(extname, function (mime) {
      res.writeHead(200, {'Content-Type': mime});
      res.end(data);
    });

  });


});

server.listen(3000, function () {
  console.log('监听端口: 3000');
});


/**
 * 根据后缀名, 从mime.json文件中获取数据, 并返回对应的MIME类型.
 * @param extname
 */
function getMIME(extname, callback) {

  // 从mime.json中读取数据
  // fs.readFile('./mime.json', function (err, data) {
  //   console.log(data); // data是Buffer 类型, 需要JSON.parse转换为对象.
  //   return JSON.parse(data)[extname]; // 由于回调函数的异步, 不能直接在这里返回MIME类型.
  // })

  // 自己的做法
  // var data = fs.readFileSync('./mime.json');
  // if (!data) {
  //   throw data;
  // }
  // return JSON.parse(data)[extname];

  // 视频中的做法
  fs.readFile('./mime.json', function (err, data) {
    console.log(data); // data是Buffer 类型, 需要JSON.parse转换为对象.
    callback(JSON.parse(data)[extname]);
  })

}


