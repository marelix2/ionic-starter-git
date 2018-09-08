angular.module('starter.services', [])
  .factory('authenticateService', function ($rootScope, $location) {

    var service = {
      isLoggedIn: false
    };

    $rootScope.$on('user.login', function () {
      service.isLoggedIn = true;
      service.SaveState();
    });
    $rootScope.$on('user.logout', function () {
      service.isLoggedIn = false;
      service.SaveState();
    });

    service.SaveState = function () {
      sessionStorage.userService = angular.toJson(service.isLoggedIn);
    };

    service.RestoreState = function () {
      service.isLoggedIn = angular.fromJson(sessionStorage.userService);
    };

    service.onLogin = function (username, password) {
      if (username === 'admin' && password === 'admin') {
        $rootScope.$broadcast('user.login');
        return true;
      }
      $rootScope.$broadcast('user.logout');
      return false;
    };

    service.onLogout = function () {
      $rootScope.$broadcast('user.logout');
    };


    service.onLoginCheck = function () {
      service.RestoreState();
      return service.isLoggedIn;
    };

    return service;
  })

  .factory('spotifyService', function ($http, $window) {
    var service = {};

    service.getAccess = function (CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) {
      var BASE_URL= 'https://accounts.spotify.com/authorize/?';

     $window.location.assign( BASE_URL+'client_id='+CLIENT_ID+'&response_type=token&redirect_uri='+REDIRECT_URI+'&scope=user-read-private%20user-read-email&response_type=token&state=123');

    };

    return service;
  })

