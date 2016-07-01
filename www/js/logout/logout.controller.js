/*
 * Logout module
 *
 * Handles logout.
 */
angular
  .module('instapp.logoutController', [])
  .controller('LogoutController', LogoutController)

LogoutController.$inject = [
  '$ionicPopup',
  '$scope',
  '$state',
  'BaasBoxService',
  'ErrorService']

function LogoutController ($ionicPopup, $scope, $state, BaasBoxService, ErrorService) {
  $scope.logout = function () {
    BaasBoxService.logout()
      .then(function (body) {
        localStorage.removeItem('BaasBoxToken')
        $state.go('login')
      }, function (error) {
        ErrorService.handleError(error)
      })
  }
}
