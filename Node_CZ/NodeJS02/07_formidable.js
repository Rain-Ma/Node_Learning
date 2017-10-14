/**
 * 接收post请求
 * 文件上传使用第三方
 * */


var http = require('http');
var queryString = require('querystring');
var formidable = require('formidable');

var server = http.createServer(function (req, res) {

  // 如果访问地址是dopost, 并且请求方式是post
  if(req.url === '/dopost' && req.method.toLowerCase() === 'post') {

    var form = new formidable.IncomingForm();

    // 注意上传文件时, 在<form>标签中要设置类型enctype="multipart/form-data"
    // 设置文件上传存放地址
    form.uploadDir = './uploads';
    form.encoding = 'utf-8';

    form.parse(req, function (err, fields, files) {

      // 所有的文本域, 单选框等都在fields存放
      // 所有的文件域 在files里存放
      console.log(fields);
      console.log(files);


      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('success');

    })






  }
});

server.listen(3000, function () {
  console.log('监听端口号: 3000');
});