App.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/partials/purchases/index',
            controller: 'IndexController'
        })
        .when('/new', {
            templateUrl: '/partials/purchases/new',
            controller: 'NewController'
        })
        .when('/edit/:id', {
            templateUrl: '/partials/purchases/edit',
            controller: 'EditController'
        })
        .otherwise({
            redirectTo: '/'
        });

});
