
var file = require('../modules/file.js');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var sd = require('silly-datetime');


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

// 上传页面
exports.showUp = function (req, res) {

  file.getAllAlbums(function (err, albums) {
    res.render('up', {albums: albums});
  });



};

exports.doPost = function (req, res, next) {
  var form = new formidable.IncomingForm();

  // 配置图片上传路径.
  form.uploadDir = path.normalize(__dirname + '/../tempup/');
  console.log(__dirname + '/../tempup/');

  form.parse(req, function (err, fields, files) {
    // console.log(fields);
    // console.log(files);

    // 出现错误之后, 转移给下一个中间件
    if (err) {
      next();
      return;
    }

    // 判断文件尺寸
    var size = parseInt(files.tupian.size);
    console.log(size);
    if (size > 1024 * 1024) {
      res.send('图片应该小于1M');
      // 删除图片
      fs.unlink(files.tupian.path);
      return;
    }



    // 图片新名称的组成
    var time = sd.format(new Date(), 'YYYYMMDDHHmmss');
    var random = parseInt(Math.random() * 10000);
    var extname = path.extname(files.tupian.name);
    // 移动图片
    var oldPath = files.tupian.path;
    var newPath = path.normalize(__dirname + '/../uploads/' + fields.wenjianjia + '/' + time + random + extname);
    fs.rename(oldPath, newPath, function (err) {
      if(err) {
        res.send('改名失败');
        return;
      }
      res.send('成功'); // 注意 send()方法只能调用一次.
    })

  });
  return;
};