(function() {
    'use strict';

    angular
    .module('app.shop')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['ShopServices', '$log', '$scope', '$mdToast', 'CartServices'];

    function ProfileController(ShopServices, $log, $scope, $mdToast, CartServices) {

        var vm = this;

        vm.query = {order: 'name', limit: 10, page: 1, filter: ''};

        vm.getOrders = getOrders;

        vm.init = init;

        function init() {
            vm.getOrders();
        }

        function saveProfile() {

        }

        function saveAddress() {

        }

        function getOrders() {
            ShopServices.listOrder()
            .then(function(data) {
                vm.allOrders = data
                vm.orders = data;

                if (vm.query.page*vm.query.limit > vm.orders.length) {
                    vm.orders = vm.orders.slice((vm.query.page-1)*vm.query.limit);
                } else {
                    vm.orders = vm.orders.slice((vm.query.page-1)*vm.query.limit, vm.query.page*vm.query.limit);
                }
            });
        }

        vm.init();
    }
})();
