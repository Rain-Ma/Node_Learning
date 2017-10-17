
var file = require('../modules/file.js');

// 首页
exports.showIndex = function (req, res) {
  // res.render('index', {albums: file.getAllAlbums()});

  // Node.js的编程思维, 就是所有的东西都是异步的
  // 所以, 内层函数不是return数据, 而是调用高层函数提供的回调函数, 把数据当做回调函数的擦那是来使用.
  file.getAllAlbums(function (allAlabums) {
    res.render('index', {
      'albums': allAlabums
    });
  })


};

exports.showAlbum = function (req, res) {
  res.send('我是相册: ' + req.params.albumName);
}

