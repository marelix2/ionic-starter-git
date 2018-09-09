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
    var service = {
      categories: []
    };

    service.getAccess = function (CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) {
      var BASE_URL = 'https://accounts.spotify.com/authorize/?';

      $window.location.assign(BASE_URL + 'client_id=' + CLIENT_ID + '&response_type=token&redirect_uri=' + REDIRECT_URI + '&scope=user-read-private%20user-read-email&response_type=token&state=123');

    };

    service.getCategoryPlaylists = function (category) {
      var BASE_URL = 'https://api.spotify.com/v1/browse/categories/';

      return $http({
        method: 'GET',
        url: BASE_URL + category + '/playlists',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + $window.localStorage.getItem('token')
        }
      })
    }

    service.getCategories = function () {
      var BASE_URL = 'https://api.spotify.com/v1/browse/categories';

      return $http({
        method: 'GET',
        url: BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + $window.localStorage.getItem('token')
        }
      });
    }

    service.getPlaylistTracks = function (playlistId) {
      var BASE_URL = 'https://api.spotify.com/v1/playlists/';

      return $http({
        method: 'GET',
        url: BASE_URL + playlistId + '/tracks',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + $window.localStorage.getItem('token')
        }
      })
    }

    service.getTrack= function (trackId) {
      var BASE_URL = 'https://api.spotify.com/v1/tracks/';

      return $http({
        method: 'GET',
        url: BASE_URL + trackId,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + $window.localStorage.getItem('token')
        }
      })
    }

    return service;
  })

