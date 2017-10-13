/**
 * 静态资源文件管理
 * 让用户输入的路径中的文件和真实的文件对应上.
 * static目录变为根目录
 * 本页中代码实现的静态资源文件管理功能, Apache服务器本身就自带
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');


var server = http.createServer(function (req, res) {

  // 得到用户的路径
  var pathName = url.parse(req.url).pathname;

  // 如果用户输入的是根路径(只有域名)
  if (pathName === '/') {
    pathName = '/index.html';
  }
  // 获取后缀
  var extName = path.extname(pathName);

  // 读取用户路径中的文件
  fs.readFile('./static' + pathName, function (err, data) {
    if (err) {
      // 如果此文件不存在, 就应该用404返回.
      fs.readFile('./static/404.html', function (err, data) {
        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(data);
      });

    } else {
      // 无法区分读取的文件类型, 这样Content-Type设置的类型(MIME 类型)就无法确定
      // 解决办法: 第三方 mime框架
      // 原生解决办法, 判断文件后缀, 使用path模块
      var mime = getMime(extName);
      res.writeHead(200, {'Content-Type': mime});
      res.end(data);
    }

  });

});

server.listen(3000,function () {
  console.log('监听3000端口');
});

/**
 * 根据后缀名, 返回MIME类型
 * @param extName
 * @return {*}
 */
function getMime(extName) {
  switch (extName) {
    case '.html':
      return 'text/html';
    case '.jpg':
      return 'image/jpg';
  }

}








