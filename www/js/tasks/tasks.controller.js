/*
 * Task controller module
 *
 * Controlls the behavior of the task list view.
 */

angular
  .module('instapp.tasksController', ['instapp.tasksService'])
  .controller('TasksController', TasksController)

TasksController.$inject = [
  '$scope',
  '$ionicPopup',
  'BaasBoxService',
  'ErrorService',
  'TasksService']

function TasksController ($scope, $ionicPopup, BaasBoxService, ErrorService, TasksService) {
  $scope.tasks = TasksService.get()

  // Get list of tasks on opening the tab
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     $scope.update()
  })

  // Update task list
  $scope.update = function () {
    BaasBoxService.getTasks()
      .then(function (body) {
        $scope.tasks = body.data.data
        TasksService.set($scope.tasks)
      }, function (error) {
        ErrorService.handleError(error)
      })
      .finally(function () {
        // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete')
      })
  }
}
