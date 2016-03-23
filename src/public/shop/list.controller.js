(function() {
    'use strict';

    angular
    .module('app.shop')
    .controller('ListController', ListController);

    ListController.$inject = [];

    function ListController() {

        var vm = this;

        vm.init = init;

        function init() {
        
        }

        vm.init();
    }
})();
