(function() {
    'use strict';

    angular
    .module('app.auth')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = [ 'AuthServices', '$log', '$mdToast'];

    function RegisterController(AuthServices, $log, $mdToast) {
        var vm = this;

        vm.init = init;
        vm.register = register;

        function init() {
            vm.user = {email: '', password: '', first_name: '', last_name: '', gender: '', phone: '', street: '', city: '', zip: ''};
        }

        function register(user) {
            AuthServices.register(user.email, user.password, user.first_name, user.last_name, user.gender, user.phone,
                                 user.street, user.city, user.zip)
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
