
var express = require('express');

var app = express();

// var router = require('./controller/router');
var router = require('./controller');

// 设置模板引擎
app.set('view engine', 'ejs');

// 设置中间件

// app.use(express.static('./public')); // 提供静态服务

// 由于额外添加了/static, 所以在模板(.html)中的所有路径都需要添加'/static', 否则访问不到.
// app.use('/static',express.static('./public')); // 提供静态服务

// 为了模板中不那么麻烦(除了图片的路径是绝对地址), 去掉'/static'
app.use(express.static('./public')); // 提供静态服务
app.use(express.static('./uploads'));

// 首页
app.get('/', router.showIndex);

// app.get('/admin', function (req, res) {
//   // 为了讲解知识点, 对项目没有用处
//   res.send('admin'); // 无法发送'admin', 因为路径已经匹配到./public/admin了.
//   // TODO: 要特别注意是否和静态文件路径冲突
//   // 解决方法, 添加一个路径(例如 /static)
// });

app.get('/:albumName', router.showAlbum);

app.get('/up', router.showUp);
app.post('/up', router.doPost);


// 404
app.use(function (req, res) {
  res.render('err', {
    'baseURL': req.pathname
  });
});


app.listen(3000, function () {
  console.log('监听端口号: 3000');
});












