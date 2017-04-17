/*global angular*/
// mainView module
var main = angular.module('myApp.mainView', [
  'ngRoute',
  'myApp.main.directives'
]);

main.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main/:genre?', {
    templateUrl: '/views/main.html',
    controller: 'MainController'
  });
}]);

main.controller('MainController', [
  '$scope',
  'api',
  'Paginator',
  '$http',
  '$rootScope',
  'config',
  function ($scope, api, Paginator, $http, $rootScope, config) {
    var keepDate = $scope.years = new Date().getFullYear();
    $scope.thumbnailUrl = config.thumbnailUrl;
    $scope.mobileThumbnailUrl = config.mobileThumbnailUrl;
    $scope.research = [];
    $scope.with_genres = [];
    var i;


    api.movieList(function (data) {
      $scope.genres = data.genres;
      $scope.reset = function (target) {
        var targetDom = document.getElementById(target);
        var children = angular.element(targetDom).children();
        $scope.with_genres = [];
        $scope.language = 'en';
        $scope.years = keepDate;
        $scope.search(1, null, 'reset', $scope.years, children);
      };
    });

    $http.get('/isoLangs.json').success(function (json) {
      $scope.countries = json;
    }).error(function () {
      $scope.countries = require(__dirname + '/../isoLangs.json');// jshint ignore:line
    });

    $scope.search = function (num, genreId, event, year, target) {
      i = $scope.with_genres.indexOf(genreId);
      if (event && event !== 'reset' ) {
        if ( i === -1 && event.target ) {
          angular.element(event.target).toggleClass('checked');
          $scope.with_genres.push(genreId);
        } else {
          angular.element(event.target).toggleClass('checked');
          $scope.with_genres.splice(i,1);
        }
      } else if (event === 'reset') {
         target.removeClass('checked');
      }

      $scope._search(num);
    };

    $scope._search = function (num) {
      var genreMap = $scope.with_genres.join();
      api.get({ act1 : 'discover',
                act2 : 'movie',
                page : num,
                with_genres : genreMap,
                language : $scope.language,
                'release_date.lte' : $scope.years + '-12-31',
                timeout : 1500
              }, function (list) {
        if (list.results.length) {
          $scope.noResults = false;
          $scope.topMovies = list.results;
          $scope.totalPages = list.total_pages;
          $scope.currentPage = num;
          $scope.searchPaginator =
            Paginator($scope._search.bind($scope), $scope.totalPages, num, 4);
          window.scrollTo(0,0);
        } else {
          $scope.topMovies = [];
          $scope.searchPaginator = {};
          $scope.noResults = true;
        }
      }, function (err) {
        console.log(err);
      });
    };

    $scope.$watch('years + language', function () {
      // init main.js
      if ($scope.language){
        $scope.$emit('locale', $scope.language);
      }
      $scope.search($scope.currentPage || 1, $scope.genreId, null, $scope.years);
    });

}]);
