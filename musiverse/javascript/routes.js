angular.module('app').config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: '/templates/pages/main/index.html'
        })
        .when('/results', {
            templateUrl: '/templates/pages/results/index.html'
        })
        .when('/team', {
            templateUrl: '/templates/pages/team/index.html'
        })
        .when('/', {
            templateUrl: '/templates/pages/main/index.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});