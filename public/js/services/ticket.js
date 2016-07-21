"use strict";

angular.module('TicketProvider', []).factory('ticketProvider', ['$http', '$rootScope', '$window', 'userProvider', function ($http, $rootScope, $window, userProvider) {

    function priorities() {
        return [
            "Trivial",
            "Minor",
            "Major",
            "Critical",
            "Blocker"
        ]
    }

    /**
     * Create One ticket
     * @param ticket
     * @param callback
     */
    function create(ticket, callback) {
        ticket['user_id'] = $window.localStorage.getItem('user');
        $http.post('/api/tickets/create', ticket).success(callback)
    }

    /**
     * Get All comments to ticket
     * @param param
     * @param callback
     * @returns {*}
     */
    function comments(param, callback) {
        return $http.get('/api/tickets/comments/' + param.ticket_id).success(callback)
    }

    /**
     * Get All tickets
     * @param callback
     * @returns {*}
     */
    function tickets(callback) {
        return $http.get('/api/tickets').success(callback);
    }

    /**
     * GET One ticket
     * @param param
     * @param callback
     * @returns {*}
     */
    function ticket(param, callback) {
        return $http.get('/api/tickets/one/' + param.ticket_id).success(callback)
    }

    /**
     * Add comment to ticket
     * @param ticket
     * @param callback
     * @returns {*}
     */
    function addcomment(ticket, callback) {
        var comment = {
            texte: ticket.comments.texte,
            user: userProvider.user(),
            ticket: ticket._id
        };
        return $http.post('/api/tickets/add/comment', comment).success(callback)
    }


    return {
        priorities: priorities,
        create: create,
        tickets: tickets,
        ticket: ticket,
        addcomment: addcomment,
        comments: comments
    }

}]);