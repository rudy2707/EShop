(function() {
    'use strict';

    angular
    .module('app.shop')
    .controller('ListController', ListController);

    ListController.$inject = ['ShopServices'];

    function ListController(ShopServices) {

        var vm = this;

        vm.init = init;

        function init() {
            ShopServices.listProduct()
            .then(function(data) {
                vm.products = data;
            });
        }

        vm.init();
    }
})();
