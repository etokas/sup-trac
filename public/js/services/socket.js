"use strict";


angular.module('SocketProvider', []).factory('socket', ['socketFactory', function (socketFactory) {

    return socketFactory();
}]);