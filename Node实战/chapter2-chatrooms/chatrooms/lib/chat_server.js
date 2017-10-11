/**
 * 定制的Node模块
 * 处理基于Socket.IO的服务端聊天功能
 */

var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};


exports.listen = function (server) {
  io = socketio.listen(server); // 启动Socket.IO服务器, 允许它搭载在已有的HTTP服务器上.
  io.set('log level', 1);
  io.sockets.on('connection', function () {

    // 在用户连接上来时赋予其一个访客名
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
  })


}
