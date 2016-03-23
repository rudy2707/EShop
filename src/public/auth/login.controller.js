(function() {
    'use strict';

    angular
    .module('app.auth')
    .controller('LoginController', LoginController);

    LoginController.$inject = [ 'AuthServices', '$log', '$mdToast'];

    function LoginController(AuthServices, $log, $mdToast) {
        var vm = this;

        vm.init = init;
        vm.login = login;

        function init() {
            $log.debug("[LoginController] init");
            vm.message = "Or not";
            vm.user = {email: '', password: ''};
        }

        function login(email, password) {
            $log.debug("[LoginController] login clicked");
            AuthServices.login(email, password)
            .then(function(res) {
                $log.debug(res);
                $mdToast.show($mdToast.simple().textContent(res.msg));
            }, function(res) {
                $log.debug(res);
                $mdToast.show($mdToast.simple().textContent(res.msg));
            });
        }

        vm.init();
    }

})();
