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
    socket.forward('update', $scope);
    socket.forward('data', $scope);

    $scope.$on('socket:error', function (ev, data) {
        console.log(data);
    });

    $scope.$on('socket:update', function (ev, data) {
        console.log(data);

        $scope.names=data;
    });

    $scope.$on('socket:data', function (ev, data) {
        console.log(data);
    });

    $scope.submit = function() {
        console.log($scope.input);
        socket.emit('submit', $scope.input);
        console.log(global);
    }
}]);
