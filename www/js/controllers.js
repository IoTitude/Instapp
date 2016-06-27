angular.module('starter.controllers', [])
/*
.controller('LoginCtrl', function ($scope, $ionicPopup, $state, BaasBoxService, TasksService, ErrorService) {
  $scope.data = {}
  $scope.login = function() {
    BaasBoxService.login($scope.data.username, $scope.data.password)
      .then(function (body) {
        token = body.data.data["X-BB-SESSION"];
        // Save token for further calls that require authentication
        BaasBoxService.setToken(token)
        BaasBoxService.getTasks()
          .then(function (body) {
            TasksService.set(body.data.data)
          }, function (error) {
            ErrorService.handleError(error)
          })
        $state.go('tab.tasks')
      }, function(error) {
        ErrorService.handleError(error)
      })
  }
})
*/
.controller('LogoutCtrl', function ($scope, $state, $ionicPopup, BaasBoxService, ErrorService) {
  $scope.logout = function () {
    BaasBoxService.logout()
      .then(function (body) {
        $state.go('login')
      }, function (error) {
        ErrorService.handleError(error)
      })
  }
})
/*
// Controller for task list view
.controller('TaskCtrl', ['$scope', '$ionicPopup', 'Tasks', 'BaasBoxService', 'ErrorService', function ($scope, $ionicPopup, Tasks, BaasBoxService, ErrorService) {
  $scope.tasks = Tasks.get()

  $scope.update = function () {
    BaasBoxService.getTasks()
      .then(function (body) {
        $scope.tasks = body.data.data
      }, function (error) {
        ErrorService.handleError(error)
      })
  }
}])
*/
// Controller for task detail view
/*
.controller('TaskDetailCtrl', ['$ionicPopup', '$scope', '$stateParams', 'BaasBoxService', 'Tasks', 'ErrorService', function ($ionicPopup, $scope, $stateParams, BaasBoxService,Tasks, ErrorService) {
  // parameter name 'taskName' must match the parameter defined in the state url
  $scope.task = Tasks.getTask($stateParams.taskName)

  $scope.toggle = function (task) {
    BaasBoxService.toggleTask(task)
      .then(function (body) {
        $ionicPopup.alert({
          title: body.data.result
        })
      }, function (error) {
        ErrorService.handleError(error)
      })
  }
}])
*/
