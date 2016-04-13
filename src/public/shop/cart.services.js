(function() {
    'use strict';

    angular
        .module('app.shop')
        .factory('CartServices', CartServices);

    // Inject dependecies
    CartServices.$inject = ['REST_SERVER', '$log'];

    // Services
    function CartServices(REST_SERVER, $log) {

        var LOCAL_CART = 'cart_eshop';

        function loadCart() {
            return JSON.parse(window.localStorage.getItem(LOCAL_CART));
        }

        function storeCart(cart) {
            window.localStorage.setItem(LOCAL_CART, JSON.stringify(cart));
        }

        // Base URL used for REST calls
        // var urlBase = REST_SERVER + '/shop';

        // Factory object
        var CartServices = {};

        CartServices.AddProduct = function(product) {
            var cart = loadCart();
            // var cart = [];

            if (!cart) cart = [];

            if (!product.quantity) product.quantity = 1;

            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name === product.name) {
                    if ((cart[i].quantity + product.quantity) < product.stock) cart[i].quantity += product.quantity;
                    else return false;
                }
            }

            cart.push(product);
            storeCart(cart);
            return true;
        }

        CartServices.EmptyCart = function() {
            var cart = [];
            storeCart(cart);
            return true;
        }

        CartServices.GetCart = function() {
            return loadCart();
        }

        return CartServices;
    }
})();
