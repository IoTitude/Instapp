/*
 * Main module for Instapp.
 *
 * Combines all required modules together and starts the application.
 */
angular
  .module('instapp', [
    'ionic',
    'ngCordova',
    'instapp.detailController',
    'instapp.loginController',
    'instapp.logoutController',
    'instapp.tasksController',
    'instapp.qrController',
    'instapp.baasBoxService',
    'instapp.errorService'])
  .run(appRun)

function appRun ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}

angular
  .module('instapp')
  .config(config)

function config ($stateProvider, $urlRouterProvider) {
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

  // Each tab has its own nav history stack:

    .state('tab.tasks', {
      url: '/tasks',
      views: {
        'tab-tasks': {
          templateUrl: 'templates/tab-tasks.html',
          controller: 'TasksController'
        }
      }
    })

    .state('tab.task-detail', {
      url: '/tasks/:taskName',
      views: {
        'tab-tasks': {
          templateUrl: 'templates/task-detail.html',
          controller: 'DetailController'
        }
      }
    })

    .state('tab.qr', {
        url: '/qr',
        views: {
          'tab-qr': {
            templateUrl: 'templates/tab-qr.html',
            controller: 'QRController'
          }
        }
    })

    .state('tab.logout', {
      url: '/logout',
      views: {
        'tab-logout': {
          templateUrl: 'templates/tab-logout.html',
          controller: 'LogoutController'
        }
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login')
}

// Service for communicating with the BaasBox API

angular
  .module('instapp.baasBoxService', [])
  .service('BaasBoxService', BaasBoxService)

  BaasBoxService.$inject = ['$http', 'SERVER_CONFIG']

  function BaasBoxService ($http, SERVER_CONFIG) {
    var baseUrl = SERVER_CONFIG.BASE_URL
    var appcode = SERVER_CONFIG.APPCODE

    // Get all headers required by different calls.
    //
    // Headers that are not required by a call are just discarded by the
    // BaasBox backend.
    var getHeaders = function () {
      return {
        headers: {
          "X-BB-SESSION": localStorage.getItem('BaasBoxToken'),
          "X-BAASBOX-APPCODE": appcode,
          "Content-type": "application/json"}
      }
    }

    this.login = function(username, password) {
      var url = baseUrl + "/login"
      return $http.post(url, {"username": username, "password": password, "appcode": appcode})
    }

    // Get all tasks from database
    this.getTasks = function() {
      var url = baseUrl + "/document/Master"
      return $http.get(url, getHeaders())
    }

    // Logout
    this.logout = function () {
      var url = baseUrl + "/logout"
      return $http.post(url, {}, getHeaders())
    }

    // Update task status through BaasBox REST API
    this.toggleTask = function (task) {
      var id = task.id
      var url = baseUrl + "/document/Master/" + id + "/.enabled"
      var body = {
        "data": task.enabled
      }
      return $http.put(url, body, getHeaders())
    }

    // Update task status through BaasBox plugin
    this.toggleTaskSDN = function (task) {
      var url = baseUrl + "/plugin/instapp.toggle"
      var body = task
      return $http.put(url, body, getHeaders())
    }

    // Set token
    this.setToken = function (newToken) {
      localStorage.setItem('BaasBoxToken', newToken)
    }
  }

/* Server configuration
 *
 * This information might be best hidden from GitHub but at this point in
 * development it doesn't matter much.
 */
angular
  .module('instapp.baasBoxService')
  .constant('SERVER_CONFIG', {
    'BASE_URL': 'http://82.196.14.4:9000',
    'APPCODE': '1234567890'
  })

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

angular
  .module('instapp.errorService')
  .constant('errMsg', {
    DEFAULT: 'Something went wrong. Sorry :(',
    SERVER_NOT_FOUND: 'Unable to connect to server.',
    BAD_REQUEST: '400: Check your username and password.',
    UNAUTHORIZED: '401: Unathorized. Please sign in first.'
  })

angular
  .module('instapp.loginController', [])
  .controller('LoginController', LoginController)

LoginController.$inject = [
  '$ionicPopup',
  '$scope',
  '$state',
  'BaasBoxService',
  'ErrorService',
  'TasksService']

function LoginController ($ionicPopup, $scope, $state, BaasBoxService, ErrorService, TasksService) {
  $scope.data = {}
  $scope.login = function() {
    BaasBoxService.login($scope.data.username, $scope.data.password)
      .then(function (body) {
        token = body.data.data["X-BB-SESSION"];
        // Save token for further calls that require authentication
        BaasBoxService.setToken(token)
        $state.go('tab.tasks')
      }, function(error) {
        ErrorService.handleError(error)
      })
  }
}

angular
  .module('instapp.logoutController', [])
  .controller('LogoutController', LogoutController)

LogoutController.$inject = [
  '$ionicPopup',
  '$scope',
  '$state',
  'BaasBoxService',
  'ErrorService']

function LogoutController ($ionicPopup, $scope, $state, BaasBoxService, ErrorService) {
  $scope.logout = function () {
    BaasBoxService.logout()
      .then(function (body) {
        localStorage.removeItem('BaasBoxToken')
        $state.go('login')
      }, function (error) {
        ErrorService.handleError(error)
      })
  }
}

angular
  .module('instapp.detailController', ['instapp.tasksService'])
  .controller('DetailController', DetailController)

DetailController.$inject = [
  '$ionicPopup',
  '$scope',
  '$stateParams',
  'BaasBoxService',
  'ErrorService',
  'TasksService']

function DetailController ($ionicPopup, $scope, $stateParams,
  BaasBoxService, ErrorService, TasksService) {
    $scope.$on('$ionicView.beforeEnter', function () {
      // parameter name 'taskName' must match the parameter defined in the state url
      $scope.task = TasksService.getTask($stateParams.taskName)
    })

    $scope.toggle = function (task) {
      BaasBoxService.toggleTaskSDN(task)
        .then(function (body) {
          $ionicPopup.alert({
            title: body.data.result
          })
        }, function (error) {
          ErrorService.handleError(error)
        })
    }
}

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

angular
  .module('instapp.tasksService', [])
  .factory('TasksService', TasksService)

function TasksService () {
  var tasks = {}

  return {
    set: function (t) {
      tasks = t
    },
    get: function () {
      return tasks
    },
    getTask: function (id) {
      for (i = 0; i < tasks.length; i++) {
        if (tasks[i].mac === id) {
          return tasks[i]
        }
      }
    }
  }
}

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
