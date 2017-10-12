/**
 * Node.js没有web容器的概念
 * Node.js和apache对比:
 *  在Apache下, URL直接访问文件, 浏览器就能接收到数据, 显示页面
 *  在Node.js中, URL中直接访问文件是访问不到的, 必须经过fs读取文件内容, 再发送给前端才行.
 *
 * Node.js没有根目录的概念，因为它根本没有任何的web容器！
 让node.js提供一个静态服务，都非常难！
 URL和真实物理文件，是没有关系的。URL是通过了Node的顶层路由设计，呈递某一个静态文件的。
 */



var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {

  // 路由设计
  if(req.url === '/fang') {
    // 回调函数套回调函数
    fs.readFile('./test/test.html', function (err, data) {

      if (err) {
        console.log(err);
        res.writeHead(404, {'Content-type': 'test/html;charset=UTF-8'});
        res.end('文件未找到');
      } else {

        // 不知道为什么访问成功, 但是却变成下载了, 不是显示在页面上.
        // 原因, 读取的html文件中的<title>元素如果没有写内容, 就会出现这种问题.
        res.writeHead(200, {'Content-type': 'test/html;charset=UTF-8'});
        res.end(data);
      }

    });
  } else if (req.url === '/yuan') {
    fs.readFile('./test/yuan.html', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
      res.end(data);
    });


  } else if (req.url === '/subing.jpg') { // 在yuan.html中添加图片, 访问图片的路径.

    fs.readFile('./test/subing.jpg', function (err, data) {
      res.writeHead(200, {'Content-Type': 'image/jpg'});
      res.end(data);
    });

  } else if (req.url === '/bb.css') { // 在yuan.html中访问css文件
    fs.readFile('./test/aa.css', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  }

  else {
    res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end('页面不存在')
  }

});


server.listen(3000, function () {
  console.log('监听端口号: 3000');
});


