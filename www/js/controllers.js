angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicPopup, $state, BaasBoxService, Tasks) {
  $scope.data = {}
  $scope.login = function() {
    BaasBoxService.login($scope.data.username, $scope.data.password)
      .then(function (body) {
        token = body.data.data["X-BB-SESSION"];
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
