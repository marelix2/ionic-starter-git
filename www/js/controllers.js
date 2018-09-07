angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, $timeout, $location) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.loginData = {
      username: "",
      password: ""
    };
    // $scope.$on('$ionicView.loaded', function () {
    //   ;
    //   if ($scope.loginData.username === "") {
    //     console.log("nie zalogowano", $scope.loginData);
    //     $location.path("/login");
    //   }
    // });

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

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  })

  .controller('LoginCtrl', function ($scope, $location, authenticateService) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.loginData = {
      username: "admin",
      password: "admin"
    };

    function doLogin() {
      console.log('alelelel');
      if (authenticateService.login($scope.loginData.username, $scope.loginData.password)) {
        console.log('wchodze tu');
        $location.path('/playlists');
      }
    }


  })



