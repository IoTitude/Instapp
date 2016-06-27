// Service for communicating with the BaasBox API

angular
  .module('instapp.baasBoxService', [])
  .service('BaasBoxService', BaasBoxService)

  BaasBoxService.$inject = ['$http', 'SERVER_CONFIG']

  function BaasBoxService ($http, SERVER_CONFIG) {
    var baseUrl = SERVER_CONFIG.BASE_URL
    var appcode = SERVER_CONFIG.APPCODE
    var token = ""

    this.login = function(username, password) {
      return $http.post(baseUrl + "/login", {"username": username, "password": password, "appcode": appcode})
    }

    // Get all tasks from database
    this.getTasks = function() {
      return $http.get(baseUrl + "/document/tasks", {headers: {"X-BB-SESSION": token}})
    }

    // Logout
    this.logout = function () {
      return $http.post(baseUrl + "/logout", {}, {headers: {"X-BB-SESSION": token, "X-BAASBOX-APPCODE": appcode}})
    }

    // Update task status
    this.toggleTask = function (task) {
      var id = task.id
      return $http.put(baseUrl + "/document/tasks/" + id + "/.enabled",
        {"data": task.enabled},
        {headers: {
          "X-BB-SESSION": token,
          "Content-type": "application/json"
        }})
    }

    // Set token
    this.setToken = function (newToken) {
      token = newToken
    }
  }
