module.exports = function () {

  var body = this;
  body.sockets = [];

  body.add = function(newSocket) {
    body.sockets.push(newSocket);
  };

  body.emit = function(channel, object) {
    for (var socket in body.sockets) {
      socket.emit(channel, object);
    }
  };

  return body;
}
