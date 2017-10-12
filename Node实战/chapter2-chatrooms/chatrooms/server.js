/**
 * 程序主文件
 *
 */


var http = require('http'); // 内置的http模块提供了HTTP服务器和客户端功能

var fs = require('fs'); // 内置的fs模块提供了与文件系统相关的功能

var path = require('path'); // 内置的path模块提供了与文件系统路径相关的功能

var mime = require('mime'); // 附加的mime模块有根据文件扩展名得出MIME类型的能力

var cache = {}; // cache是用来缓存文件内容的对象.

/**
 * 三个辅助函数
 * 提供静态HTTP文件服务
 */

/**
 * 1. 请求文件不存在时发送404错误
 * @param response 响应对象
 */
function send404(response) {
  // 设置响应头
  response.writeHead(404, {'Content-Type': 'test/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

/**
 * 2. 提供文件数据服务
 * @param response
 * @param filePath
 * @param fileContents
 */
function sendFile(response, filePath, fileContents) {

  response.writeHead(
    200,
    {
      // http://nodejs.cn/api/path.html#path_path_basename_path_ext
      // path.basename('/foo/bar/baz/asdf/quux.html');
      // 返回: 'quux.html'
      "content-type": mime.getType(path.basename(filePath))
      // mime.getType() 可以将 'quux.html' 转换为对应的 MIME 类型
    }
  );

  response.end(fileContents);
}

/**
 * 3. 读取文件
 *  如果文件缓存就从内存中读取,
 *  否则从硬盘读取文件.
 *
 * @param response
 * @param cache
 * @param absPath
 */
function serverStatic(response, cache, absPath) {
  if (cache[absPath]) { // 检查文件是否缓存在内存中
    sendFile(response, absPath, cache[absPath]); // 从内存中返回文件
  } else {
    fs.exists(absPath, function (exists) { // 检查文件是否存在
      if (exists) { // 文件存在
        fs.readFile(absPath, function (err, data) { // 从硬盘中读取文件
          if (err) { // 出错
            send404(response);
          } else {
            cache[absPath] = data; // 将文件内容缓存.
            sendFile(response, absPath, data); // 返回从硬盘中读取到的文件.
          }
        });
      } else { // 文件不存在
        send404(response); // 发送HTTP 404响应
      }

    })
  }


}


/**
 * 创建HTTP服务器
 *
 * 回调函数中定义了对每个请求的处理行为.
 */
var server = http.createServer(function (request, response) {
  var filePath = false;
  if (request.url === '/') {
    filePath = 'public/index.html'; // 确定返回的默认HTML文件
    // 如果客户端没有发送请求文件的路径(直接就是域名), 那么直接返回默认文件.
  } else {
    filePath = 'public' + request.url; // 将URL路径转为文件的相对路径
    // 注: request.url 是客户端发送过来的请求文件的路径, 我们将它转换为我们目录文件的相对路径.
  }

  var absPath = './' + filePath;

  serverStatic(response, cache, absPath); // 返回静态文件

});

/**
 * 启动服务器
 */
server.listen(3000, function () {
  console.log("Server listening on port 3000.");
});

// 测试时发现, 改变index.html之后, 需要重启服务器, 客户端才能接收到改变后的内容, 是由于进行了缓存. Vue项目中热加载就可以避免这种问题, 更改模板后, 客户端会直接改变, 不需要重启服务器和刷新页面.


/**
 * 设置Socket.IO 服务器
 */

var chatServer = require('./lib/chat_server');

// 给Socket.IO服务器提供一个定义好的HTTP服务器, 这样它就能跟HTTP服务器共享同一个TCP/IP端口
chatServer.listen(server);




















