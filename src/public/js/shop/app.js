(function() {
    'use strict';

    angular
    .module('app', [
        'ui.router',
        'ngMaterial',
        'constants',
        'app.auth',
        'app.shop'
    ])

    .run(
    //   [ '$rootScope', '$state', '$stateParams', 'AuthServices', 'AUTH_EVENTS',
    //     function ($rootScope,   $state,   $stateParams, AuthServices, AUTH_EVENTS) {
      [ '$rootScope', '$state', '$stateParams', 'AuthServices',
        function ($rootScope,   $state,   $stateParams, AuthServices) {

            $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
                if (!AuthServices.isAuthenticated()) {
                    if (next.name !== 'auth.login' && next.name !== 'auth.register') {
                        event.preventDefault();
                        $state.go('auth.login');
                    }
                }
            });

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
            .state('shop.cart', {
                url: '/cart',
                templateUrl: 'public/shop/cart.view.html'
            })
            .state('shop.profile', {
                url: '/profile',
                templateUrl: 'public/shop/profile.view.html'
            })
            .state('shop.3d', {
                url: '/3d',
                templateUrl: 'public/shop3d.html'
            })
        }
      ]
    )
    .config(function($mdThemingProvider) {
        // $mdThemingProvider.theme('altTheme')
        //     .primaryPalette('blue');
        // $mdThemingProvider.setDefaultTheme('altTheme');
    })

    .config(function($mdIconProvider) {
      $mdIconProvider.fontSet('md', 'material-icons');
    })
    ;

})();
