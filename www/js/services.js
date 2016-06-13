angular.module('starter.services', [])

.service('BaasBoxService', function($http) {
  var baseUrl = "http://192.168.142.37:9000";
  var appcode = "1234567890";
  var token = "";

  this.login = function(username, password) {
    return $http.post(baseUrl + "/login", {"username": username, "password": password, "appcode": appcode})
  };

  // Get all devices from database
  this.getDevices = function() {
    if (token.length > 0) {
      $http.get(baseUrl + "/document/raspit", {headers: {"X-BB-SESSION": token}})
        .then(function(body) {
          console.log(body);
        }, function(error) {
          console.log(error);
        });
    }
    else {
      console.log("Not signed in.")
    }
  };

  // Add new device to the database
  this.addDevice = function(device) {
    // Unchecked checkbox values are not passed forward from form. Add false.
    if (!device.status) {
      device.status = false;
    }
    console.log(device);
    $http.post(baseUrl + "/plugin/new_device.script", device, {headers: {"X-BB-SESSION": token}})
      .then(function(body) {
        console.log(body);
      }, function(error) {
        console.log(error);
      });
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
