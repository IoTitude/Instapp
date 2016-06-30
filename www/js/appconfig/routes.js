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
