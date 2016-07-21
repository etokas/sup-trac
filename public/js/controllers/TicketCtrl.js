"use strict";

angular.module('TicketCtrl', []).controller('TicketController', function ($scope, $window, $rootScope, ticketProvider, $state, $stateParams, socket) {

    $scope.priorities = ticketProvider.priorities();

    ticketProvider.comments($stateParams, function (response) {
        $scope.comments = response
    });

    $scope.create = function (ticket) {
        ticketProvider.create(ticket, function () {
            $state.go('new')
        });
    };

    $scope.addComment = function (ticket) {
        ticketProvider.addcomment(ticket, function (response) {
            socket.emit('add comment', response);
        })
    };

    socket.on('receive comment', function (data) {
        $scope.$apply(function () {
            $scope.comments.push(data.comment);
        });

        $scope.ticket.comments.texte = "";
    });

    ticketProvider.tickets(function (response) {
        $scope.tickets = response
    });

    ticketProvider.ticket($stateParams, function (response) {
        $scope.ticket = response
    })

});