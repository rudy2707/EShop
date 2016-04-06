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
        var urlBase = REST_SERVER + '/shop';

        // Factory object
        var ShopServices = {};

        ShopServices.listProduct = function(filter) {
            var deffered = $q.defer();

            $http.post(urlBase + '/productList', "FILTER="+filter)
            .then(function(result) {
                var ar = [];
                for (var item in result.data) {
                    ar.push(result.data[item]);
                }
                deffered.resolve(ar);
            });
            return deffered.promise;
        }

        return ShopServices;
    }
})();
