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
  
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     $scope.update()
  })

  $scope.update = function () {
    BaasBoxService.getTasks()
      .then(function (body) {
        $scope.tasks = body.data.data
      }, function (error) {
        ErrorService.handleError(error)
      })
      .finally(function () {
        // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete')
      })
  }
}
