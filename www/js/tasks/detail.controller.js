/*
 * Task detail controller module
 *
 * Controlls the behavior of the task details view.
 */

angular
  .module('instapp.detailController', ['instapp.tasksService'])
  .controller('DetailController', DetailController)

DetailController.$inject = [
  '$ionicPopup',
  '$scope',
  '$stateParams',
  'BaasBoxService',
  'ErrorService',
  'TasksService']

function DetailController ($ionicPopup, $scope, $stateParams,
  BaasBoxService, ErrorService, TasksService) {
    // Load task when entering the view
    $scope.$on('$ionicView.beforeEnter', function () {
      // parameter name 'taskName' must match the parameter defined in the state url
      $scope.task = TasksService.getTask($stateParams.taskName)
    })

    // Switch task / metering unit enabled between true / false
    $scope.toggle = function (task) {
      BaasBoxService.toggleTaskSDN(task)
        .then(function (body) {
          $ionicPopup.alert({
            title: body.data.result
          })
        }, function (error) {
          ErrorService.handleError(error)
        })
    }
}
