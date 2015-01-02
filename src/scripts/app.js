/*global angular*/
// app
"use strict";
// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.resource',
  'myApp.paginator',
  'myApp.mainView',
  'myApp.movieView'
]);

myApp.config([
  '$routeProvider',
  '$resourceProvider',
  '$locationProvider',
function($routeProvider, $resourceProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
  $locationProvider.html5Mode(true);
}]);

myApp.run(['$rootScope', '$window', function ($rootScope, $window) {
  $rootScope.language = $window.localStorage.getItem('language');
  $rootScope.$on('locale', function (event, language) {
    $rootScope.language = language;
    $window.localStorage.setItem('language', language);
  });

  $rootScope.$watch('screenSize', function (val, old, scope) {
    switch (val) {
      case 'visible-md':
        scope.screen = 'md';
        break;
      case 'visible-lg':
        scope.screen = 'lg';
        break;
      case 'visible-xs':
        scope.screen = 'xs';
        break;
      case 'visible-sm':
        scope.screen = 'sm';
        break;
    }
  });
}]);
