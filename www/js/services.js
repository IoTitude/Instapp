angular.module('starter.services', [])

.service('BaasBoxService', function($http) {
  var baseUrl = "http://192.168.142.37:9000";
  var appcode = "1234567890";
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

  // Set token
  this.setToken = function (newToken) {
    token = newToken
  }

});
