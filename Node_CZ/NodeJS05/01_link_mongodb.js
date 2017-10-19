var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();

var id = 0;

app.get('/', function (req, res) {

  // url是数据库地址, /表示数据库
  // 加入数据库不存在, 程序会帮你自动创见一个数据库
  var url = 'mongodb://localhost:27017/haha';

  // 连接数据库
  MongoClient.connect(url, function (err, db) {
    // db是连接的数据库实例.
    if (err) {
      res.send('数据库连接失败');
      return;
    }
    console.log('连接数据库成功');

    // 插入数据
    db.collection('student').insertOne({
      'stuID': ++id,
      "name": 'Tom',
      'age': parseInt(Math.random() * 100)
    }, function (err, result) {
      console.log(result);
      res.send(result);
      db.close();
    });
    // db.close() //关闭数据库

  })
});

app.listen(3000, function () {
  console.log('监听端口号: 3000');
});
