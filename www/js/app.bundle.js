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

// Default Ionic run
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

/*
 * Instapp routes configuration
 *
 * Configures different states the app can be in. These are used to manage
 * the different views the user moves through.
 */

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

    // Tasklist view configuration
    .state('tab.tasks', {
      url: '/tasks',
      views: {
        'tab-tasks': {
          templateUrl: 'templates/tab-tasks.html',
          controller: 'TasksController'
        }
      }
    })

    // Task detail view configuration
    .state('tab.task-detail', {
      url: '/tasks/:taskName',
      views: {
        'tab-tasks': {
          templateUrl: 'templates/task-detail.html',
          controller: 'DetailController'
        }
      }
    })

    // QR reader view configuration
    .state('tab.qr', {
        url: '/qr',
        views: {
          'tab-qr': {
            templateUrl: 'templates/tab-qr.html',
            controller: 'QRController'
          }
        }
    })

    // Logout view configuration
    .state('tab.logout', {
      url: '/logout',
      views: {
        'tab-logout': {
          templateUrl: 'templates/tab-logout.html',
          controller: 'LogoutController'
        }
      }
    })

    // Login view configuration
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login')
}

/*
 * Service for communicating with the BaasBox API
 *
 * Manages all the calls needed to the BaasBox REST API.
 */

angular
  .module('instapp.baasBoxService', [])
  .service('BaasBoxService', BaasBoxService)

  BaasBoxService.$inject = ['$http', 'SERVER_CONFIG']

  function BaasBoxService ($http, SERVER_CONFIG) {
    var baseUrl = SERVER_CONFIG.BASE_URL
    var appcode = SERVER_CONFIG.APPCODE

    /* Get all headers required by different calls.
     *
     * Headers that are not required by a call are just discarded by the
     * BaasBox backend.
     */
    var getHeaders = function () {
      return {
        headers: {
          "X-BB-SESSION": localStorage.getItem('BaasBoxToken'),
          "X-BAASBOX-APPCODE": appcode,
          "Content-type": "application/json"}
      }
    }

    // Login request
    this.login = function(username, password) {
      var url = baseUrl + "/login"
      return $http.post(url, {"username": username, "password": password, "appcode": appcode})
    }

    // Get all tasks from database
    this.getTasks = function() {
      var url = baseUrl + "/document/Master"
      return $http.get(url, getHeaders())
    }

    // Logout request
    this.logout = function () {
      var url = baseUrl + "/logout"
      return $http.post(url, {}, getHeaders())
    }

    // Update task status through BaasBox REST API.
    // Final application uses toggleTaskSDN() instead
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

    // Set token to local storage. The token is required by all requests
    // that need authentication.
    this.setToken = function (newToken) {
      localStorage.setItem('BaasBoxToken', newToken)
    }
  }

/* Server configuration
 *
 * This is a template of the configuration needed for connecting to the
 * backend service provided by BaasBox. Change these to suit your needs.
 */
angular
  .module('instapp.baasBoxService')
  .constant('SERVER_CONFIG', {
    'BASE_URL': 'localhost:9000',
    'APPCODE': '1234567890'
  })

/*
 * Module for error handling.
 *
 * Other services pass their errors to this service in order to inform the user
 * about what went wrong. By using this service the overall code is DRYer.
 */

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

/*
 * Configuration for the ErrorService.
 */

angular
  .module('instapp.errorService')
  .constant('errMsg', {
    DEFAULT: 'Something went wrong. Sorry :(',
    SERVER_NOT_FOUND: 'Unable to connect to server.',
    BAD_REQUEST: '400: Check your username and password.',
    UNAUTHORIZED: '401: Unathorized. Please sign in first.'
  })

/*
 * Login module.
 *
 * Handles the login process.
 */

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
        // Get the token from the return message
        token = body.data.data["X-BB-SESSION"]
        // Save token for further calls that require authentication
        BaasBoxService.setToken(token)
        $state.go('tab.tasks')
      }, function(error) {
        ErrorService.handleError(error)
      })
  }
}

/*
 * Logout module
 *
 * Handles logout.
 */
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
  '$ionicPopup',
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
