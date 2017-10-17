
var experss = require('express');


var app = experss();
app.get('/', function (req, res) {
  // http://localhost:3000/?id=23&name=Tom&age=34
  console.log(req.query); // 输出: { id: '23', name: 'Tom', age: '34' }
  res.send(req.query);
});


app.listen(3000, function () {

  //
  console.log('监听端口号: 3000');
});


