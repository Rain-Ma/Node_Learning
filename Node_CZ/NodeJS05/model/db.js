/**
 * 这个模块里面封装了所有对数据库的常用操作.
 */

var MongoClient = require('mongodb').MongoClient;


/**
 * 1. 连接数据库, 封装成内部函数
 * @param callback
 * @private
 */
function _connectDB(callback) {

  var url = 'mongodb://localhost:27017/haha';
  // 连接数据库
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('连接数据库失败');
      return;
    }

    console.log('连接数据库成功');

    callback(err, db);


  })


}


/**
 * 2. 插入数据
 * @param collecionName 集合名称
 * @param json 插入数据
 * @param callback
 */
exports.insertOne = function (collecionName, json, callback) {
  _connectDB(function (err, db) {
    db.collection(collecionName).insertOne(json, function (err, result) {

      callback(err, result);
      db.close();

    })
  })
};

/**
 * 3. 查询数据
 * @param collectionName
 * @param json
 * @param callback
 */
exports.find = function (collectionName, json, callback) {
  // if (arguments.length != 3) {
  //   callback('find函数接受3个函数', null);
  //   return;
  // }

  _connectDB(function (err, db) {
    var cursor = db.collection(collectionName).find(json);
    cursor.toArray(function (err, docs) {
      // console.log(docs);
      callback(err, docs);
      db.close();
    })

  });
};

/**
 * 4. 分页
 * @param collectionName
 * @param json
 * @param args
 * @param callback
 */
exports.paging = function (collectionName, json, args, callback) {

  // 根据当前页数, 计算应该省略的条数.
  var skipNumber = args.pageamount * (args.page - 1);
  // 条数限制(每页的条数)
  var limit = args.pageamount;

  _connectDB(function (err, db) {

    var cur = db.collection(collectionName).find(json).skip(skipNumber).limit(limit);

    cur.toArray(function (err, docs) {
      callback(err, docs);
      db.close();
    })

  })
}


/**
 * 结合 3 和 4
 */


exports.findDoc = function (collectionName, json, C, D) {
  var callback, skipNumber, limit;

  // 自己编写函数重载, 判断
  if (arguments.length == 3) {
      callback = C;
      skipNumber = 0;
      limit = 0;
  } else if (arguments.length == 4) {
    callback = D;
    var args = C;
    skipNumber = args.pageamount * (args.page - 1);
    limit = args.pageamount;
  } else {
    throw new Error('find函数的参数个数是3个或4个');
    return;
  }

  _connectDB(function (err, db) {
    var cur = db.collection(collectionName).find(json).skip(skipNumber).limit(limit);
    cur.toArray(function (err, docs) {
      callback(err, docs);
    })
  });

}





