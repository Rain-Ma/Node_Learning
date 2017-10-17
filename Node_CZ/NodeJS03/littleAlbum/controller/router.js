
var file = require('../modules/file.js');

// 首页
exports.showIndex = function (req, res) {
  // res.render('index', {albums: file.getAllAlbums()});

  // Node.js的编程思维, 就是所有的东西都是异步的
  // 所以, 内层函数不是return数据, 而是调用高层函数提供的回调函数, 把数据当做回调函数的擦那是来使用.
  file.getAllAlbums(function (err, allAlabums) {

    if(err) {
      res.send(err);
      return;
    }

    res.render('index', {
      'albums': allAlabums
    });
  })


};


// 相册页
exports.showAlbum = function (req, res, next) {
  // 遍历相册中的所有图片
  var albumName = req.params.albumName;
  // 具体业务交个modules
  file.getAllImagesByAlbumName(albumName, function (err,images) {
    if (err) {
      next(); //交给下面的中间件, 这样路径错误的时候就都交给404了.
      return;
    }

    res.render('album', {
      'albumName': albumName,
      'images': images
    });
  });



};

