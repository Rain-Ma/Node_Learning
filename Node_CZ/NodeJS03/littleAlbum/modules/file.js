/**
 * 文件操作
 */

var fs = require('fs');
var path = require('path');

// 获取相册目录的名称
exports.getAllAlbums = function (callBack) {

  // 模块中的路径参数都是从根目录出发的, 所以是 './uploads'
  fs.readdir('./uploads', function (err, files) {
    if(err) {
      callBack('没有找到uploads目录', null);
    }

    var allAlbums = [];
    for (var i = 0; i < files.length; i++) {
      var stat = fs.statSync('./uploads/'+files[i]);
      // var stat = fs.statSync(files[i]); // 如果传入的路径错误, 会直接就报错, 不会返回错误信息.
      if (stat.isDirectory()) {
        allAlbums.push(files[i]);
      }
    }
    // return allAlbums; // 出现错误, 由于是异步的.
    // 解决方法 添加回调函数
    callBack(null, allAlbums);
    return;
  });

};

// 获取相册中图片的名称
exports.getAllImagesByAlbumName = function(albumName, callBack) {
  fs.readdir('./uploads/' + albumName, function (err, files) {
    if (err){
      callBack('没有找到' + albumName + '文件', null);
      return;
    }

    var allImages = [];

    for (var i = 0; i < files.length; i++) {
      var stat = fs.statSync('./uploads/' + albumName + '/' + files[i]);
      if (stat.isFile()) allImages.push(files[i]);
    }

    callBack(null, allImages);
    return;



  });
}

