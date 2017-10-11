/**
 * 客户端处理和服务器端通信的文件
 */




/**
 * 处理聊天命令, 发送消息, 请求变更房间或昵称
 * @param socket
 * @constructor
 */
var Chat = function (socket) {
  this.socket = socket;
};

/**
 * 发送聊天消息的函数
 * @param room
 * @param text
 */
Chat.prototype.sendMessage = function (room, text) {
  var message = {
    room: room,
    text: text
  };
  this.socket.emit('message', message);
};

/**
 * 变更房间
 * @param room
 */
Chat.prototype.changeRoom = function (room) {
  this.socket.emit('join', {
    newRoom: room
  });
};

/**
 * 处理聊天命令
 * @param command 聊天命令字符串
 * @return 返回处理结果.
 */

Chat.prototype.processCommand = function (command) {
  var words = command.split(' ');

  // 从第一个单词开始解析命令
  var command = words[0].substring(1, words[0].length).toLowerCase();

  var message = false;

  switch (command) {
    case 'join': // 处理房间的变换/创建
      words.shift();
      var room = words.join(' ');
      this.changeRoom(room);
      break;
    case 'nick': // 处理更名尝试
      words.shift();
      var name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;
    default: // 如果命令无法识别, 返回错误消息.
      message = 'Unrecognized command.';
      break;
  }

  return message;

};






















