/**
 * 文件操作
 */

var fs = require('fs');
var path = require('path');

exports.getAllAlbums = function (callBack) {

  // 模块中的路径参数都是从根目录出发的, 所以是 './uploads'
  fs.readdir('./uploads', function (err, files) {
    var allAlbums = [];
    for (var i = 0; i < files.length; i++) {
      var stat = fs.statSync('./uploads/'+files[i]);
      if (stat.isDirectory()) {
        allAlbums.push(files[i]);
      }
    }
    console.log(allAlbums);
    // return allAlbums; // 出现错误, 由于是异步的.
    // 解决方法 添加回调函数
    callBack(allAlbums);
    return;
  });

};