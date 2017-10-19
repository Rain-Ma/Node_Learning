var express = require('express');
var db = require('./model/db');
var app = express();

// 访问首页, 增加一条数据
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

// 查询所有数据
app.get('/all', function (req, res) {
  db.find('student', {}, function (err, docs) {
    res.send(docs);
  });
})

// 分页
app.get('/paging', function (req, res) {
  // 这个页面接受一个page参数
  var page = parseInt(req.query.page);
  db.paging('student', {},{pageamount: 5, page: page}, function (err, result) {
    res.send(result);
  });

});

// 既可以查询所有数据, 也可以分页.
app.get('/allOrPaging', function (req, res) {
  var page = parseInt(req.query.page);
  db.findDoc('student', {}, {pageamount: 7, page: page},function (err, docs) {
    res.send(docs);
  })
});

// 删除数据
app.get('/shan', function (req, res) {
  var id = parseInt(req.query.id);

  // 根据stuID 删除 学生信息.
  db.deleteMany('student', {stuID: id}, function (err, result) {
    res.send(result);
  })
});

// 修改数据
app.get('/xiugai', function (req, res) {
  db.updateMany(
    'student', // 修改的集合名称
    {stuID: 4}, // 找到修改的数据
    {$set:{name: '小红'}}, // 新数据
    function (err, result) { // 修改之后的回调函数
    res.send(result);
  });
});

app.listen(3000, function () {
  console.log('监听端口号: 3000');
});
