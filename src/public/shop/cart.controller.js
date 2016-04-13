(function() {
    'use strict';

    angular
        .module('app.shop')
        .controller('CartController', CartController);

        CartController.$inject = ['CartServices', '$log', '$scope', '$mdToast'];

        function CartController(CartServices, $log, $scope, $mdToast) {
            var vm = this;

            vm.init = init;
            vm.deleteProduct = deleteProduct;
            vm.loadSumCart = loadSumCart;

            function init() {
                loadCart();
            }

            // Load the cart
            // Used each time a modification on the cart is done (such as quantity, removal of an item, ...)
            function loadCart() {
                vm.cart = CartServices.GetCart();
                loadSumCart();
            }

            function loadSumCart() {
                vm.sumCart = getTotalCart();
            }

            // Delete a product from the cart and print a toast message
            function deleteProduct(product) {
                if (CartServices.DeleteProduct(product)) {
                    $mdToast.show($mdToast.simple().textContent("Product remove from cart"));
                }
                else {
                    $mdToast.show($mdToast.simple().textContent("Error when removing the product from the cart"));
                }
                loadCart();
            }

            // Calculate the sum of the cart
            function getTotalCart() {
                var sum = 0;
                for (var i = 0; i < vm.cart.length; i++) {
                    sum += vm.cart[i].price * vm.cart[i].quantity;
                }
                return sum;
            }

            vm.init();
        }
})();
