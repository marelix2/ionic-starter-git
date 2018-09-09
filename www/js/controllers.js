angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, $timeout, $location, $window, $ionicPopover, authenticateService) {
    $scope.$on('$ionicView.enter', function () {
      if (!authenticateService.onLoginCheck()) {
        $location.path('/app/login');
      }
    });

    $scope.$on('$ionicView.afterLeave', function () {
      $scope.popover.hide();
    });

    $scope.logout = function () {
      authenticateService.onLogout();
      $window.localStorage.removeItem('token');
      $location.path('/app/login');
    }

    $ionicPopover.fromTemplateUrl('templates/popover-menu.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function () {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });
    // Execute action on hidden popover
    $scope.$on('popover.hidden', function () {
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
      // Execute action
    });
  })

  .controller('TokenCtrl', function ($scope, $stateParams, $window, $location) {


    var token = $stateParams.access_token;
    $window.localStorage.setItem('token', token.substr(13, token.indexOf('&') - 13));
    $location.path('/app/playlists');

  })

  .controller('CateogryCtrl', function ($scope, spotifyService) {

    spotifyService.getCategories().then(function (value) {
      console.log(value.data.categories.items);
      $scope.categories = value.data.categories.items;
    })
  })

  .controller('LoginCtrl', function ($scope, $location, authenticateService, spotifyService, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) {

    $scope.loginData = {
      username: "admin",
      password: "admin"
    };

    $scope.doLogin = function () {
      if (authenticateService.onLogin($scope.loginData.username, $scope.loginData.password)) {
        spotifyService.getAccess(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
      } else {
        $location.path('/app/login');
      }
    }
  })

  .controller('SearchCtrl', function ($scope) {

  })

  .controller('PlaylistCtrl', function ($scope, spotifyService, $stateParams) {

    $scope.category = $stateParams.category;

    $scope.$on('$ionicView.enter', function () {
      spotifyService.getCategoryPlaylists($scope.category).then(function (value) {
        $scope.playlists = value.data.playlists.items.map(function (item) {
          return {
            id: item.id,
            name: item.name,
            images: item.images,
            tracks: item.tracks.total,
            owner: item.owner.display_name,
            showCardBody: false
          }
        });

      });
    });

    $scope.showCardBody = function (playlist) {
      return !playlist.showCardBody;
    }
  })

  .controller('TracksCtrl', function ($scope, spotifyService, $stateParams,$sce) {
    var playlistId = $stateParams.tracks;

    $scope.showCardBody = function (playlist) {
      return !playlist.showCardBody;
    }

     $scope.$on('$ionicView.enter', function () {
      spotifyService.getPlaylistTracks(playlistId).then(function (value) {

        $scope.playlist = value.data.items.map(function (item) {
          return {
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists.map( function (artist) { return artist.name}).join(", "),
            images: item.track.album.images[1],
            src: item.track.external_urls.spotify,
            showCardBody: false
          }
        });
        console.log($scope.playlist);
      });


    });

  })


