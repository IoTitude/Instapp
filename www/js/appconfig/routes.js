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
