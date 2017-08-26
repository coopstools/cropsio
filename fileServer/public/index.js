var app = angular.module('farmApp', [
        'btford.socket-io',
    ]);

app.factory('socket', function(socketFactory) {
    return socketFactory();
});

app.controller('mainController', [
        '$scope',
        'socket',
        function($scope, socket) {
    $scope.input = "Testing line";
    $scope.names = ['Jared', 'Maria'];

    socket.forward('error', $scope);
    socket.forward('names', $scope);
    socket.forward('data', $scope);
    socket.forward('update', $scope);

    $scope.$on('socket:error', function (ev, data) {
        console.log(data);
    });

    $scope.$on('socket:names', function (ev, data) {
        console.log(data);
        $scope.names=data;
    });

    $scope.$on('socket:data', function (ev, data) {
        console.log(data);
    });

    $scope.$on('socket:update', function (ev, data) {
      if (players[data.id]) {
        players[data.id].update(data.x, data.y);
      } else {
        players[data.id] = new Player(data);
      }
      console.log(data);
    });

    $scope.submit = function() {
        console.log($scope.input);
        socket.emit('submit', $scope.input);
    }

    $scope.move = function(direction) {
      console.log(MOVEMENT.MV_DR);
      console.log(direction);
      socket.emit('update', MOVEMENT[direction]);
    }
}]);

var Player = function(data) {

  this.x = data.x;
  this.y = data.y;
  this.r = 25;
  this.color = data.color;

  this.show = function() {
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.update = function(x, y) {
    this.x = x;
    this.y = y;
  }
};
