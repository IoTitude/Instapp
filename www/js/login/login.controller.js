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
        token = body.data.data["X-BB-SESSION"];
        // Save token for further calls that require authentication
        BaasBoxService.setToken(token)
        /*
        BaasBoxService.getTasks()
          .then(function (body) {
            TasksService.set(body.data.data)
          }, function (error) {
            ErrorService.handleError(error)
          })
          */
        $state.go('tab.tasks')
      }, function(error) {
        ErrorService.handleError(error)
      })
  }
}
