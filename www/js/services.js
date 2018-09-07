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

  .factory('spotifyService', function ($http) {
    var service = {};

    service.getAccess = function (CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) {
      var BASE_URL= 'https://accounts.spotify.com/authorize/?';

      // $http.get( BASE_URL+'client_id='+CLIENT_ID+'&response_type=code&redirect_uri='+REDIRECT_URI+'&scope=user-read-private%20user-read-email&state=34fFs29kd09').success( function(response) {
      //   return response;
      // });
      //
      $http.post(  BASE_URL+'client_id='+CLIENT_ID+'&response_type=code&redirect_uri='+REDIRECT_URI+'&scope=user-read-private%20user-read-email&state=34fFs29kd09').success( function(response) {
        console.log(response)
        return response;
      });

    };

    return service;
  })

