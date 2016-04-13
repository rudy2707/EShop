(function() {
    'use strict';

    angular
    .module('app.shop')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['ShopServices', '$log', '$scope', '$mdToast', 'CartServices'];

    function ProfileController(ShopServices, $log, $scope, $mdToast, CartServices) {

        var vm = this;

        vm.init = init;

        function init() {
        }

        vm.init();
    }
})();
