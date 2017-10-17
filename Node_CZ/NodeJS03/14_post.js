
var experss = require('express');

var bodyParser = require('body-parser');
var app = experss();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('form');
});

app.use(bodyParser.urlencoded({extended: false})); // 解析请求头中类型为 application/x-www-form-urlencoded
app.post('/', function (req, res) {
  res.send(req.body)
})


app.listen(3000, function () {

  //
  console.log('监听端口号: 3000');
});


