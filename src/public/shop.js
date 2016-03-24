angular.module('app')
.controller('AppCtrl', function DemoCtrl($mdDialog) {
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
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Log out')
          .textContent('Voulez-vous vraiment vous déconnecter ?')
          .cancel('non')
          .ok('oui')
      );
      originatorEv = null;
      // This never happens.
    };

});
 





