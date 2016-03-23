(function() {
    'use strict';

    angular
    .module('app', [
        'ui.router',
        'ngMaterial',
        'constants',
        'app.auth'
    ])

    .run(
    //   [ '$rootScope', '$state', '$stateParams', 'AuthServices', 'AUTH_EVENTS',
    //     function ($rootScope,   $state,   $stateParams, AuthServices, AUTH_EVENTS) {
      [ '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
            //     if (!AuthServices.isAuthenticated()) {
            //         console.log(next.name);
            //         if (next.name !== 'survey.login' && next.name !== 'survey.thankyou') {
            //             event.preventDefault();
            //             $state.go('survey.login');
            //         }
            //     }
            // });

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
      ]
    )
    .config(
    [ '$stateProvider', '$urlRouterProvider', '$provide',
    function ($stateProvider,   $urlRouterProvider, $provide) {
        $urlRouterProvider
            .otherwise('/auth/login');
        $stateProvider
            .state('auth', {
                abstract: true,
                url: '/auth',
                templateUrl: 'public/auth.html'
            })
            .state('auth.login', {
                url: '/login',
                templateUrl: 'public/auth/login.view.html'
            })
            .state('auth.register', {
                url: '/register',
                templateUrl: 'public/auth/register.view.html'
            })
            .state('shop', {
                abstract: true,
                url: '/shop',
                templateUrl: 'public/shop.html'
            })
            .state('shop.list', {
                url: '/list',
                templateUrl: 'public/shop/list.view.html'
            })
        }
      ]
    )
    .config(function($mdThemingProvider) {
        // $mdThemingProvider.theme('altTheme')
        //     .primaryPalette('blue');
        // $mdThemingProvider.setDefaultTheme('altTheme');
    })

    ;

})();
