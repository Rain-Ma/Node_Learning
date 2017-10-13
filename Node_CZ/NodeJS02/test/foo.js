
var msg = '你好';
var info = 'hello';

function showInfo() {
  console.log('foo.js: ', info);
}


exports.msg = msg;
exports.info = info;
exports.showInfo = showInfo;