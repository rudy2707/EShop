(function() {
    'use strict';

    angular
        .module('app.shop')
        .factory('ShopServices', ShopServices);

    // Inject dependecies
    ShopServices.$inject = [ 'REST_SERVER', '$http', '$q', '$log'];

    // Services
    function ShopServices(REST_SERVER, $http, $q, $log) {

        // Base URL used for REST calls
        var urlBase = REST_SERVER + '/shop3d';

        // Factory object
        var ShopServices = {};

        ShopServices.listProduct = function() {
            var deffered = $q.defer();

            $http.post(urlBase + '/productList')
            .then(function(result) {
                deffered.resolve(result.data);
            });
            return deffered.promise;
        }

        return ShopServices;
    }
})();
