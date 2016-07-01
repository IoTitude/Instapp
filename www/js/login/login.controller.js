/*
 * Login module.
 *
 * Handles the login process.
 */

angular
  .module('instapp.loginController', [])
  .controller('LoginController', LoginController)

LoginController.$inject = [
  '$ionicPopup',
  '$scope',
  '$state',
  'BaasBoxService',
  'ErrorService',
  'TasksService']

function LoginController ($ionicPopup, $scope, $state, BaasBoxService, ErrorService, TasksService) {
  $scope.data = {}

  $scope.login = function() {
    BaasBoxService.login($scope.data.username, $scope.data.password)
      .then(function (body) {
        // Get the token from the return message
        token = body.data.data["X-BB-SESSION"]
        // Save token for further calls that require authentication
        BaasBoxService.setToken(token)
        $state.go('tab.tasks')
      }, function(error) {
        ErrorService.handleError(error)
      })
  }
}
