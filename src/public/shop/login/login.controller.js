(function() {
    'use strict';

    angular
    .module('app.login')
    .controller('LoginController', LoginController);

    LoginController.$inject = [];

    function LoginController() {
        var vm = this;

        vm.init = init;

        function init() {
            vm.message = "Or not";
        }

        vm.init();
    }

})();
