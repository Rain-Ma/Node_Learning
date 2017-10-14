
var http = require('http');

var ejs = require('ejs');
var fs = require('fs');


var server = http.createServer(function (req, res) {

  fs.readFile('./views/index.ejs', function (err, data) {

    // 模板
    var template = data.toString();

    // 数据
    var dictionary = {a:6};

    // 绑定数据
    var html = ejs.render(template, dictionary);


    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end(html);

  });

});

server.listen(3000, function () {
  console.log('监听端口: 3000');
});

