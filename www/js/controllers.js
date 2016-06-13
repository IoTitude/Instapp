angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicPopup, $state, BaasBoxService) {
  $scope.data = {}
  $scope.login = function() {
    BaasBoxService.login($scope.data.username, $scope.data.password)
      .then(function (body) {
        token = body.data.data["X-BB-SESSION"];
        $state.go('tab.tasks')
      }, function(error) {
        $ionicPopup.alert({
          title: "Login failed"
        })
      })
  }
})
