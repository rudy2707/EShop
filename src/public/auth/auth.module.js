(function() {
    'use strict';

    angular
    .module('app.auth', ['constants', 'ngMaterial', 'angular-md5'])
    .constant('AUTH_EVENTS', {
      notAuthenticated: 'auth-not-authenticated'
    })
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    })
})();
