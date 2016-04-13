(function() {
    'use strict';

    angular
        .module('app.shop')
        .factory('CartServices', CartServices);

    // Inject dependecies
    CartServices.$inject = [ 'REST_SERVER', '$log'];

    // Services
    function CartServices(REST_SERVER, $log) {

        var LOCAL_CART = 'cart_eshop';

        function loadCart() {
            return window.localStorage.getItem(LOCAL_CART);
        }

        function storeCart(cart) {
            window.localStorage.setItem(LOCAL_CART, token);
        }

        // Base URL used for REST calls
        // var urlBase = REST_SERVER + '/shop';

        // Factory object
        var CartServices = {};

        CartServices.AddProduct = function(product) {
            var cart = loadCart();


            storeCart(cart);
        }

        CartServices.GetCart = function() {
            return loadCart();
        }

        return CartServices;
    }
})();
