/**
 * 接收post请求
 * 文件上传使用第三方
 * */


var http = require('http');
var queryString = require('querystring');

var server = http.createServer(function (req, res) {

  // 如果访问地址是dopost, 并且请求方式是post
  if(req.url === '/dopost' && req.method.toLowerCase() === 'post') {
    var alldata = '';

    // 接收post请求的数据
    req.addListener('data', function (chunk) { // chunk会有很多个, 将比较大的数据分隔成很多的chunk. 本地数据比较小,可能只有一个chunk
      alldata += chunk;
      console.log(chunk);
    });
    
    req.addListener('end', function () {
      var data = alldata.toString();
      var dataObj = queryString.parse(data, null, null);
      console.log(dataObj);
      res.end('success');
    })

  }
});

server.listen(3000, function () {
  console.log('监听端口号: 3000');
});