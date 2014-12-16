/*global angular*/
// main config module
var services = angular.module('config', []);

services.factory('config', [function () {
  return {
    movieApi: 'http://api.themoviedb.org/3/:act1/:act2/:act3',
    movieApiKey: 'aab623412c1ee8832be59d25ea433b48',
    thumbnailUrl: 'http://image.tmdb.org/t/p/w185',
    backgroundUrl: 'http://image.tmdb.org/t/p/original',
    embedUrl: 'http://www.youtube.com/embed/'
  };
}]);
