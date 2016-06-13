angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicPopup, $state, BaasBoxService) {
  $scope.data = {}
  $scope.login = function() {
    BaasBoxService.login($scope.data.username, $scope.data.password)
      .then(function (body) {
        token = body.data.data["X-BB-SESSION"];
        BaasBoxService.setToken(token)
        $state.go('tab.tasks')
      }, function(error) {
        $ionicPopup.alert({
          title: "Login failed"
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
