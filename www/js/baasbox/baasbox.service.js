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
      var url = baseUrl + "/login"
      return $http.post(url, {"username": username, "password": password, "appcode": appcode})
    }

    // Get all tasks from database
    this.getTasks = function() {
      var url = baseUrl + "/document/Master"
      return $http.get(url, {headers: {"X-BB-SESSION": token}})
    }

    // Logout
    this.logout = function () {
      var url = baseUrl + "/logout"
      return $http.post(url, {}, {headers: {"X-BB-SESSION": token, "X-BAASBOX-APPCODE": appcode}})
    }

    // Update task status
    this.toggleTask = function (task) {
      var id = task.id
      var url = baseUrl + "/document/Master/" + id + "/.enabled"
      var body = {
        "data": task.enabled
      }
      var headers = {
        headers: {
          "X-BB-SESSION": token,
          "Content-type": "application/json"
        }
      }
      return $http.put(url, body, headers)
    }

    this.toggleTaskSDN = function (task) {
      var url = baseUrl + "/plugin/instapp.toggle"
      var body = task
      var headers = {
        headers: {
          "X-BB-SESSION": token,
          "Content-type": "application/json"
        }
      }
      return $http.put(url, body, headers)
    }

    // Set token
    this.setToken = function (newToken) {
      token = newToken
    }
  }
