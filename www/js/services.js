angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

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
});
