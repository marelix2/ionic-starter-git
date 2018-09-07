angular.module('starter.services', [])
  .factory('authenticateService', function () {

    var service = {};

    service.login = function (username, password) {
      if (username === 'admin' && password === 'admin') {
        return true;
      }
      return false;
    }
    return service;
  })

