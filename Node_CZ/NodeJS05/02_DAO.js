var express = require('express');
var db = require('./model/db');
var app = express();

app.get('/', function (req, res) {

  // 使用自己封装的插入数据模块(以后也不用提DAO)
  db.insertOne('teacher', {'name': '小红'}, function (err, result) {
    if (err) {
      res.send('插入失败');
      return;
    }
    res.send('插入成功');
  })
});

app.get('/all', function (req, res) {
  db.find('student', {}, function (err, docs) {
    res.send(docs);
  });
})

app.get('/paging', function (req, res) {
  // 这个页面接受一个page参数
  var page = parseInt(req.query.page);
  db.paging('student', {},{pageamount: 5, page: page}, function (err, result) {
    res.send(result);
  });

});

app.get('/allOrPaging', function (req, res) {
  var page = parseInt(req.query.page);
  db.findDoc('student', {}, {pageamount: 7, page: page},function (err, docs) {
    res.send(docs);
  })
});



app.listen(3000, function () {
  console.log('监听端口号: 3000');
});
