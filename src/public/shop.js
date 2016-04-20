angular.module('app')
.controller('AppCtrl', function DemoCtrl($mdDialog, AuthServices, $state) {
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    this.notificationsEnabled = true;
    this.toggleNotifications = function() {
        this.notificationsEnabled = !this.notificationsEnabled;
    };
    this.profil = function() {
        $mdDialog.show(
            $mdDialog.alert()
            .targetEvent(originatorEv)
            .clickOutsideToClose(true)
            .parent('body')
            .title('Profil utilisateur')
            .textContent('Ceci sera l \'affichage du profil de l\'utilisateur')
            .ok('ok')
        );
        originatorEv = null;
    };
    this.LogOut = function() {
        AuthServices.logout();
        $state.go('access.login');
    };

});
