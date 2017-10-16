
var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');

var server = http.createServer(function (req, res) {
  var pathName = url.parse(req.url).pathname;

  // 访问首页, 显示所有的文件夹列表
  if (pathName === '/') {

    fs.readFile('./static/homework.ejs', function (err, data) {

      console.log('homework: ', pathName);
      // 获取uploads里面的文件夹
      fs.readdir('./uploads', function (err, files) {
        var folders = [];
        for (var i = 0; i < files.length; i++) {
          var file = files[i];

          // 获取文件的状态
          var stat = fs.statSync('./uploads/' + file);
          // 判断是否是文件夹
          if (stat.isDiKrectory()) {
            folders.push(file);
          }
        }
        // 设置模板
        var template = data.toString();
        // 设置数据
        var jsonData = {
          folders: folders
        };
        // 绑定数据
        var html = ejs.render(template, jsonData);
        // 设置请求头
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(html);
      });

    });

  } else if (pathName === '/icon.png') {

    fs.readFile('./static/images/icon.png', function (err, data) {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.end(data);
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.end('页面不存在');
  }



});

server.listen(3000, function () {
  console.log('监听端口号: 3000');
});


function getFolders(path, callBack) {
  fs.readdir(path, function (err, files) {
    var folders = [];

    for (var i = 0; i < folders.length; i++) {
      console.log(files[i]);
      var stat = fs.statSync(files[i]);
      if (stat.isDirectory()) {
        folders.push(files[i]);
      }
    }

    callBack(folders);

  })
}


/**
 * 获取MIME类型
 * @param extName 文件后缀
 * @param callBack 回调函数
 */

function getMIME(extName, callBack) {

  fs.readFile('./mime.json', function (err, data) {
    if (err) throw Error('读取mime.json文件出错');

    var dataObject = JSON.parse(data);
    callBack(data[extName]);
  });


}







