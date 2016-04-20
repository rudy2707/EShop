(function() {
    'use strict';

    angular
    .module('app.auth')
    .controller('LogoutController', LogoutController);

    LogoutController.$inject = [ 'AuthServices', '$log', '$mdToast', '$state'];

    function LogoutController(AuthServices, $log, $mdToast, $state) {
        var vm = this;

        vm.init = init;
        vm.logout = logout;

        function init() {
            $log.debug("[LogoutController] init");
        }

        function logout() {
            AuthServices.logout();
            $state.go('auth.login');
        }

        vm.init();
    }

})();
