/*
 * QR controller module
 *
 * This module handles the reading and processing of QR codes. It relies on
 * ngCordova's Barcode Scanner plugin.
 */

angular
  .module('instapp.qrController', ['instapp.tasksService'])
  .controller('QRController', QRController)

QRController.$inject = [
  '$cordovaBarcodeScanner',
  '$ionicPopup'
  '$scope',
  '$state',
  'TasksService']

function QRController ($cordovaBarcodeScanner, $ionicPopup, $scope, $state, TasksService) {
  // Enter QR scanner when user opens the QR tab
  $scope.$on("$ionicView.beforeEnter", function(event, data){
     $scope.scanBarcode()
  })

  /*
   * Mock implementation of the scanBarcode() function
   *
   * Ionic can't use cordova before building the native application. That is
   * why this mock version is needed if a developer wants to simulate the behavior
   * of the application in the browser.
   */
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
