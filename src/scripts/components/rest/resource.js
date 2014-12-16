/*global angular*/
var services = angular.module('myApp.resource', ['ngResource', 'config']);

services.factory('api', ['$resource', 'config',
function ($resource, config) {
  var presetREST = {
    topMovies : {
      method : 'GET',
      params : {
        sort_by : 'popularity.desc',
        page : '1',
      }
    },
    search : {
      method : 'GET',
      params : {
        act1 : 'search',
        act2 : 'movie',
        // AUTOCOMPLETE OPTION FLAG
        // search : 'ngram'
      }
    },
    discover : {
      method : 'GET',
      params : {
        act1 : 'discover',
        act2 : 'movie',
      }
    },
    movie : {
      method : 'GET',
      params : {
        act1 : 'movie'
      }
    },
    movieVideos : {
      method : 'GET',
      params : {
        act1 : 'movie',
        act3 : 'videos'
      }
    },
    movieList : {
      method : 'GET',
      params : {
        act1 : 'genre',
        act2 : 'movie',
        act3 : 'list'
      }
    },
    movieGenre : {
      method : 'GET',
      params : {
        act1 : 'genre',
        act3 : 'movies'
      }
    },
    countries : {
      method : 'GET',
      params : {
        act1 : 'timezones',
        act2 : 'list'
      },
      isArray : true,
      transformResponse : function (data) {
        return JSON.parse(data).map(function (item) {
          return Object.keys(item)[0];
        });
      }
    }
  };
  return $resource(config.movieApi , { api_key: config.movieApiKey}, presetREST);
}]);


