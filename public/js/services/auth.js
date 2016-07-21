"use strict";

angular.module('UserProvider', []).factory('userProvider', ['$http', '$window', '$rootScope', function ($http, $window, $rootScope) {

    function login(user) {
        $http.post('/api/auth/login', user).success(function (response) {
            if (response.type) {
                $window.localStorage.setItem('isConnected', response.type);
                $window.localStorage.setItem('user', response.user._id);

                console.log($window.localStorage.getItem('user'));


            }
        })
    }

    function isConnected() {
        return $window.localStorage.getItem('isConnected') ? true : false;
    }

    function logout() {
        $window.localStorage.clear();
    }

    function user(){
        return $window.localStorage.getItem('user');
    }


    return {
        login: login,
        isConnected: isConnected,
        logout: logout,
        user: user
    }

}]);