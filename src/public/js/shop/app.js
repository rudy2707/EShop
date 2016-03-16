(function() {
    'use strict';

    angular
    .module('app', [
        'ui.router',
        'ngMaterial',
        'constants',
        'app.login'
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
            .otherwise('/shop/login');
        $stateProvider
            .state('shop', {
                abstract: true,
                url: '/shop',
                templateUrl: 'public/app.html'
            })
            .state('shop.login', {
                url: '/login',
                templateUrl: 'public/login/login.view.html'
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
