angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicPopup, $state, BaasBoxService, Tasks) {
  $scope.data = {}
  $scope.login = function() {
    BaasBoxService.login($scope.data.username, $scope.data.password)
      .then(function (body) {
        token = body.data.data["X-BB-SESSION"];
        // Save token for further calls that require authentication
        BaasBoxService.setToken(token)
        BaasBoxService.getTasks()
          .then(function (body) {
            Tasks.set(body.data.data)
          }, function (error) {
            $ionicPopup.alert({
              title: error.data.message
            })
          })
        $state.go('tab.tasks')
      }, function(error) {
        $ionicPopup.alert({
          title: error.data.message
        })
      })
  }
})

.controller('LogoutCtrl', function ($scope, $state, $ionicPopup, BaasBoxService) {
  $scope.logout = function () {
    BaasBoxService.logout()
      .then(function (body) {
        $state.go('login')
      }, function (error) {
        $ionicPopup.alert({
          title: error.data.message
        })
      })
  }
})

// Controller for task list view
.controller('TaskCtrl', ['$scope', '$ionicPopup', 'Tasks', 'BaasBoxService', function ($scope, $ionicPopup, Tasks, BaasBoxService) {
  $scope.tasks = Tasks.get()

  $scope.update = function () {
    BaasBoxService.getTasks()
      .then(function (body) {
        $scope.tasks = body.data.data
      }, function (error) {
        $ionicPopup.alert({
          title: error.data.message
        })
      })
  }
}])

// Controller for task detail view
.controller('TaskDetailCtrl', ['$ionicPopup', '$scope', '$stateParams', 'BaasBoxService', 'Tasks', function ($ionicPopup, $scope, $stateParams, BaasBoxService,Tasks) {
  // parameter name 'taskName' must match the parameter defined in the state url
  $scope.task = Tasks.getTask($stateParams.taskName)

  $scope.toggle = function (task) {
    BaasBoxService.toggleTask(task)
      .then(function (body) {
        $ionicPopup.alert({
          title: body.data.result
        })
      }, function (error) {
        $ionicPopup.alert({
          title: error
        })
      })
  }
}])
