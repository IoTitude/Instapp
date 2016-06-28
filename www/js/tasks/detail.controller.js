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
    // parameter name 'taskName' must match the parameter defined in the state url
    $scope.task = TasksService.getTask($stateParams.taskName)

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
