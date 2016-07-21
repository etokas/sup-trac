angular.module('MainCtrl', []).controller('MainController', function ($scope, socket) {
    socket.connect();
});