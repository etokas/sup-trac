angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider

    // home page
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .state('new', {
            url: '/tickets/new',
            templateUrl: 'views/new.html',
            controller: 'TicketController'
        })

        .state('create', {
            url: '/tickets/create',
            templateUrl: 'views/create.html',
            controller: 'TicketController'
        })

        .state('all', {
            url: '/tickets/all',
            templateUrl: 'views/all.html',
            controller: 'TicketController'
        })

        .state('one', {
            url: '/tickets/:ticket_id',
            templateUrl: 'views/one.html',
            controller: 'TicketController'
        })

        // auth  page

        .state('login', {
            url: '/auth/login',
            templateUrl: 'views/auth/login.html',
            controller: 'AuthController'
        });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

}]);