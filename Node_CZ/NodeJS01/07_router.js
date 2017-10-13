/**
 * 简单的小路由演示
 *
 * 当用户访问/student/1234567890 的时候查询此学号的学生信息。
 当用户访问/teacher/645433 的时候，查询此老师的信息
 其他的，我们提示错误。如果位数不对，也是提示位数不对

 * 再次说明Node.js中没有Web容器, url中的路径不代表文件夹或文件, 是Node.js中设计的顶层路由.
 *
 * 使用express框架可以简化原生的路由.
 */

var http = require('http');
var server = http.createServer(function (req, res) {

  // 得到url
  var userURL = req.url;
  res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});

  // substr函数判断路径的开头
  if (userURL.substr(0, 9) === '/student/') {

    var studentId = userURL.substr(9);
    // 正则表达式来判断此时的地址
    // TODO: 正则
    if (/\w{10}/.test(studentId)) {
      res.end('您要查询学生信息, id为' + studentId);
    } else {
      res.end('学生学号位数不对');
    }

  } else if (userURL.substr(0, 9) === '/teacher/') {

    var teacherId = userURL.substr(9);
    if (/\w{6}/.test(teacherId)) {
      res.end('老师信息, id为: ' + studentId);
    } else {
      res.end('老师id位数不对');
    }

  } else {
    res.end('请检查url');
  }





});

server.listen(3000, function () {
  console.log('监听端口号: 3000');
});