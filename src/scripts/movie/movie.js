/*global angular*/
// movieView module
var movie = angular.module('myApp.movieView', ['ngRoute', 'myApp.main.directives']);

movie.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movie/:id', {
    templateUrl: '/views/movie.html',
    controller: 'MovieController'
  });
}]);

movie.controller('MovieController', [
  '$scope',
  'api',
  '$routeParams',
  '$rootScope',
  'config',
function ($scope, api, $routeParams, $rootScope, config) {
  $scope.backgroundUrl = config.backgroundUrl;
  $scope.thumbnailUrl = config.thumbnailUrl;
  api.movie({ act2 : $routeParams.id, language : $rootScope.language }, function (data) {
      for (var i in data) {
        if (data[i]) {
          $scope[i] = data[i];
        }
    }

    if (!$scope.overview) {
      // fallback to 'en'
      api.movie({ act2 : $routeParams.id, language : 'en' }, function (data) {
        $scope.overview = data.overview;
      });
    }

  });

  api.movieVideos({ act2 : $routeParams.id}, function (list) {
    if (list.results.length) {
      $scope.videoUrl =  config.embedUrl + list.results[0].key;
    } else {
      $scope.videoUrl = false;
    }
  });

  api.movieSimilar({ act2: $routeParams.id, language: $rootScope.language}, function (relList) {
    if (relList.results.length) {
      $scope.relatedMovies = relList.results;
    }
  });

  api.movieReviews({ act2: $routeParams.id, language: $rootScope.language}, function (reviewsList) {
    if (reviewsList.results.length) {
      $scope.reviewsMovie = reviewsList.results;
    }
  });

  $scope.videoVisible = false;

  $scope.showVideo = function () {
    $scope.videoVisible = !$scope.videoVisible;
  };

}]);

movie.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
