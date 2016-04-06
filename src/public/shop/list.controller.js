(function() {
    'use strict';

    angular
    .module('app.shop')
    .controller('ListController', ListController);

    ListController.$inject = ['ShopServices', '$log', '$scope'];

    function ListController(ShopServices, $log, $scope) {

        var vm = this;

        vm.init = init;
        vm.getProducts = getProducts;
        vm.removeFilter = removeFilter;
        vm.selected = [];
        vm.products = [];
        vm.filter = {show: false, options: {debounce: 500}};
        vm.query = {order: 'name', limit: 10, page: 1, filter: ''};

        function init() {
            vm.getProducts();
        }

        // $scope.getProducts = function () {
        function getProducts() {
            ShopServices.listProduct(vm.query.filter)
            .then(function(data) {

                vm.allProducts = data;
                vm.products = data;

                if (vm.query.page*vm.query.limit > vm.products.length) {
                    vm.products = vm.products.slice((vm.query.page-1)*vm.query.limit);
                } else {
                    vm.products = vm.products.slice((vm.query.page-1)*vm.query.limit, vm.query.page*vm.query.limit);
                }
            });
        }

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

        var bookmark;

        $scope.$watch('vm.query.filter', function (newValue, oldValue) {
            if(!oldValue) {
              bookmark = vm.query.page;
            }

            if(newValue !== oldValue) {
              vm.query.page = 1;
            }

            if(!newValue) {
              vm.query.page = bookmark;
            }

            vm.getProducts(newValue);
          });

        vm.init();
    }
})();
