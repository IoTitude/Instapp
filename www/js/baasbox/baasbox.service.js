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
