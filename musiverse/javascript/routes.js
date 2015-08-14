angular.module('app')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: '/templates/pages/main/index.html',
                controller: 'FormController',
                controllerAs: 'formController'
            })
            .when('/results/:track_id', {
                templateUrl: '/templates/pages/results/index.html',
                controller: 'SimilarController',
                controllerAs: 'similarController'
            })
            .when('/team', {
                templateUrl: '/templates/pages/team/index.html'
            })
            .when('/', {
                templateUrl: '/templates/pages/main/index.html',
                controller: 'FormController',
                controllerAs: 'formController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });