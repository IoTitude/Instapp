angular.module('starter.services', [])

/* Server configuration
 *
 * It was considered to have this information in a separate file but it might be
 * better to have it in the same module as the BaasBoxService. That way they
 * are more connected and can be treated as one module. This information might be
 * best hidden from GitHub but at this point in development it doesn't matter much.
 */
.constant('SERVER_CONFIG', {
  'BASE_URL': 'http://192.168.142.37:9000',
  'APPCODE': '1234567890'
})

// Service for communicating with the BaasBox API
.service('BaasBoxService', function($http, SERVER_CONFIG) {
  var baseUrl = SERVER_CONFIG.BASE_URL;
  var appcode = SERVER_CONFIG.APPCODE;
  var token = "";

  this.login = function(username, password) {
    return $http.post(baseUrl + "/login", {"username": username, "password": password, "appcode": appcode})
  };

  // Get all tasks from database
  this.getTasks = function() {
    return $http.get(baseUrl + "/document/tasks", {headers: {"X-BB-SESSION": token}})
  };

  // Logout
  this.logout = function () {
    return $http.post(baseUrl + "/logout", {}, {headers: {"X-BB-SESSION": token, "X-BAASBOX-APPCODE": appcode}})
  }

  // Update task status
  this.toggleTask = function (task) {
    var id = task.id
    return $http.put(baseUrl + "/document/tasks/" + id + "/.enabled", {"data": task.enabled}, {headers: {"X-BB-SESSION": token, "Content-type": "application/json" }})
  }

  // Set token
  this.setToken = function (newToken) {
    token = newToken
  }

})

// Service for storing the task list
.factory('Tasks', [function () {
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
        if (tasks[i].name === id) {
          return tasks[i]
        }
      }
    }
  }
}])
