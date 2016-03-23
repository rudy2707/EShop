(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('AuthServices', AuthServices)
        .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
              return {
                responseError: function (response) {
                  $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                  }[response.status], response);
                  return $q.reject(response);
                }
              };
            })
        .config(function ($httpProvider) {
          $httpProvider.interceptors.push('AuthInterceptor');
        });

    // Inject dependecies
    AuthServices.$inject = [ 'REST_SERVER', '$http', '$q', 'md5', '$log'];

    // Services
    function AuthServices(REST_SERVER, $http, $q, md5, $log) {

        // Base URL used for REST calls
        var urlBase = REST_SERVER + '/customer';

        // Factory object
        var AuthServices = {};

        var isAuthenticated = false;

        function useCredentials() {
            isAuthenticated = true;
        }

        function destroyCredentials() {
            isAuthenticated = false;
        }

        AuthServices.login = function(email, password) {
            var deffered = $q.defer();

            $http.post(urlBase + '/login', "EMAIL="+email+"&PASSWORD="+md5.createHash(password))
                .then(function(response) {
                    if (response.data.success == "true") {
                        deffered.resolve({"status": true, "msg": "Login OK !"});
                    } else {
                        deffered.reject({"status": false, "msg": "Login NOT OK !"});
                    }

                })
            return deffered.promise;
        }

        AuthServices.register = function(email, password, first_name, last_name, gender, phone) {
            var deffered = $q.defer();

            $http.post(urlBase + '/create', "EMAIL="+email+"&PASSWORD="+md5.createHash(password)+"&FIRST_NAME="+first_name+"&LAST_NAME="+last_name+"&GENDER="+gender+"&PHONE="+phone)
                .then(function(response) {
                    if (response.data.success) {
                        deffered.resolve({"status": true, "msg": "Registering OK !"});
                    } else {
                        deffered.reject({"status": false, "msg": "Registering NOT OK !"});
                    }

                })
            return deffered.promise;
        }

        AuthServices.logout = function() {
            destroyCredentials();
        }

        AuthServices.isAuthenticated = function() {
            return isAuthenticated;
        }

        return AuthServices;
    }
})();
