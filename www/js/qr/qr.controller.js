angular
  .module('instapp.qrController', ['instapp.tasksService'])
  .controller('QRController', QRController)

QRController.$inject = ['$scope', '$cordovaBarcodeScanner', 'TasksService', '$state', '$ionicPopup']

function QRController ($scope, $cordovaBarcodeScanner, TasksService, $state, $ionicPopup) {
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     $scope.scanBarcode()
  })

  $scope.scanBarcodeMock = function () {
    var barcodeDataMock =
    {
      text: "00-00-00-00-00-02",
      format: "QR_CODE"
    }

    if (barcodeDataMock.format === 'QR_CODE' && TasksService.getTask(barcodeDataMock.text)) {
      $state.go('tab.task-detail', {taskName: barcodeDataMock.text})
    } else {
      // TODO: Use error service instead
      $ionicPopup.alert({
        title: "No task found with this address."
      })
    }
  }

  $scope.scanBarcode = function () {
    $cordovaBarcodeScanner.scan()
      .then(function (barcodeData) {
        if (barcodeData.format === 'QR_CODE' && TasksService.getTask(barcodeData.text)) {
          $state.go('tab.task-detail', {taskName: barcodeData.text})
        } else {
          // TODO: Use error service instead
          $ionicPopup.alert({
            title: "No task found with this address."
          })
        }
      }, function (error) {
        // TODO: Use error service instead
        $ionicPopup.alert({
          title: error
        })
      })
  }
}
