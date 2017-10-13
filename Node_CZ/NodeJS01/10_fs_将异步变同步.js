

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {

  // 不处理小图标
  if(req.url === '/favicon.ico') {
    return;
  }

  // fs.readdir('./album', function (err, files) {
  //   console.log(files);
  //   var wenjianjia = [];
  //   // 遍历album中的所有文件和文件夹.
  //   for (var i = 0; i < files.length; i++) {
  //     var theFile = files[i];
  //
  //     // fs.statSync 同步方法
  //     var stats = fs.statSync('./album/' + theFile);
  //     if (stats.isDirectory()) {
  //       wenjianjia.push(theFile);
  //     }
  //     console.log('for 文件夹: ', wenjianjia);
  //   }
  //   console.log('文件夹: ', wenjianjia);
  // });

  // 视频中使用自调用函数和递归的方法将异步变为同步
  fs.readdir('./album', function (err, files) {
    var wenjianjia = [];
    (function iterator(i) {
      fs.stat('./album/' + files[i], function (err, stats) {

        if (stats.isDirectory()) {
          wenjianjia.push(files[i]);
        }
        iterator(i+1);

      });
    })(0);

  });

});

server.listen(3000, function () {
  console.log('端口号监听: 3000');
});


