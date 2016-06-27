angular
  .module('instapp.errorService', [])
  .service('ErrorService', ErrorService)

ErrorService.$inject = ['errMsg', '$ionicPopup']

function ErrorService (errMsg, $ionicPopup) {
  this.handleError = function (error) {
    var status = error.status

    switch (status) {
      case -1: {
        $ionicPopup.alert({
          title: errMsg.SERVER_NOT_FOUND
        })
      } break
      case 400: {
        $ionicPopup.alert({
          title: errMsg.BAD_REQUEST
        })
      } break
      case 401: {
        $ionicPopup.alert({
          title: errMsg.UNAUTHORIZED
        })
      } break
      default: {
        $ionicPopup.alert({
          title: errMsg.DEFAULT
        })
      }
    }
  }
}
