/**
 * 定制的Node模块
 * 处理基于Socket.IO的服务端聊天功能
 */

var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {}; // 保存用户昵称
var namesUsed = []; // 保存已经被占用的昵称
var currentRoom = {}; // 记录用户当前房间

/**
 * 启动Socket.IO服务器, 限定Socket.IO向控制台输出的日志的详细程度, 并确定该如何处理每个连接进来的连接.
 * @param server 已有的HTTP服务器
 */
exports.listen = function (server) {
  io = socketio.listen(server); // 启动Socket.IO服务器, 允许它搭载在已有的HTTP服务器上.
  io.set('log level', 1);
  io.sockets.on('connection', function (socket) {

    // 在用户连接上来时赋予其一个访客名, 并返回昵称计数器.
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

    // 在用户连接上来时把他放入聊天室Lobby里
    joinRoom(socket, 'Lobby');

    // 处理用户的消息, 更名, 以及聊天室的创建和变更
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);

    // 用户发出请求时, 向其提供已经被占用的聊天室的列表.
    socket.on('rooms', function () {
      socket.emit('rooms', io.sockets.managers.rooms);
    })

    // 定义用户断开连接后的清除逻辑
    handleClientDisconnection(socket, nickNames, namesUsed);


  });


};


/**
 * 分配用户昵称
 * @param socket
 * @param guestNumber
 * @param nickNames
 * @param namesUsed
 * @return 返回昵称计数器
 */
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  var name = 'Guest' + guestNumber;

  // 把用户昵称跟客户端连接ID关联上.
  nickNames[socket.id] = name;

  // 让用户知道他们的昵称
  socket.emit('nameResult', {
    success: true,
    name: name
  })

  // 存放已经被占用的昵称
  namesUsed.push(name);

  // 增加用来生成昵称的计数器
  return guestNumber + 1;

}

/**
 * 用户加入聊天室
 * @param socket 用户连接
 * @param room 聊天室房间
 */
function joinRoom(socket, room) {
  socket.join(room); // 用户进入房间
  currentRoom[socket.id] = room; // 记录用户的当前房间

  // 让用户知道他们进入了新的房间
  socket.emit('joinResult', {room: room});

  // 让房间里的其他用户知道有新用户进入了房间.
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.id] + ' has joined ' + room + '.'
  });

  var usersInRoom = io.sockets.clients(room);

  // 如果不止一个人在房间里, 汇总下都是谁.
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = 'Users currently in ' + room + ': ';
    for (var index in usersInRoom) {
      var userSocketId = usersInRoom[index].id;
      if (userSocketId !== socket.id) {
        if (index > 0) {
          usersInRoomSummary += ', ';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
    usersInRoomSummary += '.';

    // 将房间里其他用户的汇总给新加入的用户.
    socket.emit('message', {text: usersInRoomSummary});
  }

}


/**
 * 更名请求的处理逻辑
 * @param socket
 * @param nickNames
 * @param namesUsed
 */
function handleNameChangeAttempts(socket, nickNames, namesUsed) {

  socket.on('nameAttempt', function (name) {

    // 昵称不能以Guest开头
    if (name.indexOf('Guest') === 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Name cannot begin with "Gues".'
      });
    } else {
      // 注册昵称
      if (namesUsed.indexOf(name) == -1) {
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex]; // 删除之前的昵称
        socket.emit('nameResult', {
          success: true,
          name: name
        });

        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' is now know as ' + name + '.'
        });
      } else {
        // 如果昵称已经被占用, 给客户端发送错误消息.
        socket.emit('nameResult', {
          success: false,
          message: 'That name is already in use'
        })
      }
    }

  })





}

/**
 * 发送聊天消息
 * @param socket
 */
function handleMessageBroadcasting(socket) {
  socket.on('message', function (message) {
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    });
  })
}

/**
 * 创建房间
 * @param socket
 */
function handleRoomJoining(socket) {
  socket.on('join', function (room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  })
}

/**
 * 用户断开连接
 * @param socket
 */
function handleClientDisconnection(socket) {
  socket.on('disconnet', function () {
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  })
}


















