function Character(socket) {

  var c = this;
  c.socket = socket;
  c.x = 30;
  c.y = 30;
  c.color = "#777777";

  c.update = function(xDir, yDir) {

    c.x += xDir;
    c.y += yDir;
  };

  c.show = function() {
    return {
      id: c.socket.id,
      x: c.x,
      y: c.y,
      color: c.color
    };
  };
}

var sqrt2 = Math.sqrt(2);

module.exports = function (server) {

  var registry = {};
  var names = [];

  var io = require('socket.io')(server);

  io.on('connection', function(socket) {

      var id = socket.id;
      var char = new Character(socket);
      console.log('new connection: ' + id);
      registry[id] = char;
      socket.emit('name', names);

      socket.on('submit', function(data) {
        var newName = data;
        names.push(newName);
        console.log('new name added: ' + newName);
        io.emit('names', names)
      });

      socket.on('disconnect', function() {
        console.log(id + ' disconnected')
        delete registry[id];
      });

      socket.on('update', function(data) {
        char.update(data.x, data.y);
        io.emit('update', char.show());
      });
  });

  return io;
}
