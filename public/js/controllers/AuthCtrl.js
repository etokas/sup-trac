"use strict";

angular.module('AuthCtrl', []).controller('AuthController', function ($window, $scope, $rootScope, userProvider, $state) {

    $scope.login = function (user) {
        userProvider.login(user);
        $state.go('home')
    };

    $scope.logout = function () {
        userProvider.logout();
        $state.go('login')
    };

    $scope.isConnected = function () {
        return userProvider.isConnected();
    };

});