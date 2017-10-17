
exports.showIndex = function (req, res) {
  res.render('index', {albums: ['aa', 'bb', 'cc']});
};

exports.showAlbum = function (req, res) {
  res.send('我是相册: ' + req.params.albumName);
}

