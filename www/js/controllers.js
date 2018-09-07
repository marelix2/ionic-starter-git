angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, $timeout, $location, $ionicPopover, authenticateService) {

    $scope.$on('$ionicView.enter', function () {
      if (!authenticateService.onLoginCheck()) {
        $location.path('/login');
      }
    });

    $scope.$on('$ionicView.afterLeave', function () {
      $scope.popover.hide();
    });

    $scope.logout = function () {
      authenticateService.onLogout();
      $location.path('/login');
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

  .controller('PlaylistsCtrl', function ($scope) {

    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];

  })

  .controller('LoginCtrl', function ($scope, $location, authenticateService) {

    $scope.loginData = {
      username: "admin",
      password: "admin"
    };

    $scope.doLogin = function () {
      if (authenticateService.onLogin($scope.loginData.username, $scope.loginData.password)) {
        $location.path('/app/playlists');
      } else {
        $location.path('/login');
      }
    }
  })

  .controller('SearchCtrl', function ($scope, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, spotifyService) {

    console.log(spotifyService.getAccess(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI));
   // spotifyService.getAccess();


  })



