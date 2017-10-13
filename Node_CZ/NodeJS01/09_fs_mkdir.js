/**
 * 创建文件夹
 */

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {

  // 不处理小图标
  if(req.url === '/favicon.ico') {
    return;
  }
  // 异步创建文件夹
  // fs.mkdir("./album/aaa");

  // stat检测文件状态
  fs.stat('./album/aaa', function (err, stats) {
    // 检测aaa是不是一个文件夹
    console.log(stats.isDirectory());
  });

  var wenjianjia = [];
  // 读取文件夹中的内容.
  fs.readdir('./album', function (err, files) {
    console.log(files); // 输出: [ 'aaa', 'bbb' ]
    // files是保存文件名的数组, 表示文件夹中的所有文件和文件夹.


    // 想要单独读取文件夹. (可是这样一来就同步, 会不会堵塞)
    for (var i = 0; i < files.length; i++) {
      var theFile = files[i]; // thefile只是一个字符串.
      console.log('i, theFile', i, theFile);
      fs.stat('./album/' + theFile, function (err, stats) {

        if (stats.isDirectory()) {
          wenjianjia.push(theFile);
        }
        console.log('for fs.stat内部: 文件夹: ', wenjianjia); // 输出:  [ 'ccc', 'ccc' ]


        // 当执行第一次执行 fs.stat('./album/' + theFile, function (err, stats) 时, theFile这个变量存储的是 ccc, 之前的aaa已经被覆盖.

      });
    }

    console.log('for后面: 文件夹: ', wenjianjia); // 输出: [], 因为for循环内部判断文件夹状态的是异步操作.

  })




});

server.listen(3000, function () {
  console.log('端口号监听: 3000');
});


