(function() {
    'use strict';

    angular
        .module('app.shop')
        .factory('CartServices', CartServices);

    // Inject dependecies
    CartServices.$inject = ['REST_SERVER', 'AuthServices', '$http', '$q', '$log'];

    // Services
    function CartServices(REST_SERVER, AuthServices, $http, $q, $log) {

        var LOCAL_CART = 'cart_eshop';

        // Base URL used for REST calls
        var urlBase = REST_SERVER + 'shop';

        function loadCart() {
            return JSON.parse(window.localStorage.getItem(LOCAL_CART));
        }

        function storeCart(cart) {
            window.localStorage.setItem(LOCAL_CART, JSON.stringify(cart));
        }

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

        // Remove a product from the cart
        CartServices.DeleteProduct = function(product) {
            var cart = loadCart();

            if (!cart)
                return false;

            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name == product.name) {
                    cart.splice(i, 1);
                    storeCart(cart);
                    return true;
                }
            }
            return false;
        }

        CartServices.MakeOrder = function(cart) {
            var deffered = $q.defer();

            //$http.post(urlBase + '/makeOrder/', "CART="+cart+"&EMAIL="+AuthServices.getUser().email)
            //$http.post(urlBase + '/makeOrder', "CART="+cart+"&EMAIL="+"root@root.io")
            $http.post(urlBase + '/makeOrder', {'cart': cart, 'email': 'axel@root.io'})
                .then(function(response) {
                    if (response.data.success == "true") {
                        deffered.resolve({"status": true, "msg": "Order OK !"});
                    } else {
                        deffered.reject({"status": false, "msg": "Order NOT OK !"});
                    }

                })
            return deffered.promise;
        }

        return CartServices;
    }
})();
