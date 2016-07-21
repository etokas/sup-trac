/**
 * Created by sylva on 27/06/2016.
 */

angular.module('NotifCtrl', []).controller('NotifController', function ($scope, socket, ngToast) {

    socket.on('receive comment', function (data) {
        $scope.$apply(function () {
            ngToast.create({
                content : data.message,
                timeout : 5000
            });
        })
    })

});