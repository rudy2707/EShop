(function() {
    'use strict';

    angular
        .module('app.shop')
        .controller('CartController', CartController);

        CartController.$inject = ['CartServices', '$log'];

        function CartController(CartServices, $log) {
            var vm = this;

            vm.init = init;

            function init() {
                vm.cart = CartServices.GetCart();
            }

            vm.init();
        }
})();
