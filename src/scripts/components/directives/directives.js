/*global angular*/
// global directives module
var myApp = angular.module('myApp.main.directives', []);

myApp.directive('search', ['api', '$window', '$rootScope',
function (api, $window, $rootScope) {
  var search = function (scope, query, language) {
    api.search({ query : query, language : language },
      function (data) {
      scope.research = data.results;
    },function (err) {
      scope.research = [];
      if (err.status === 404) {
      console.warn(err.statusText);
      }
    });
  };

  return {
    restrict: 'A',
    link: function (scope, iElement) {
      scope.element = iElement[0];
      iElement.on('keyup', function (e) {
        var query = iElement.val();
        if (query.length > 0) {
          if (e.which === 38 || e.which === 40) {
            iElement.next().children().eq(0)[0].focus();
            $window.scrollTo(0, iElement[0].getBoundingClientRect().top);
            return false;
          }
          search(scope, query, $rootScope.language);
        } else {
          scope.research = [];
          scope.$apply(scope.research);
        }
      });
    }
  };
}]);

myApp.directive('suggestions', [ function () {
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs) {
      var lastIndex = 0;
      iElement.on('keydown', function (e) {
        e.stopPropagation();
        var children = iElement.children();
        if (e.which === 40 || e.which === 38) {
          if (e.which === 40) {
            if (children.eq(lastIndex + 1).length) {
              children.eq(++lastIndex)[0].focus();
            } else {
              lastIndex = 0;
              children.eq(lastIndex)[0].focus();
            }
          } else if (e.which === 38 ) {
            if (children.eq(lastIndex - 1).length) {
              children.eq(--lastIndex)[0].focus();
            } else {
              lastIndex = children.length - 1;
              children.eq(lastIndex).focus();
            }
          }
          e.preventDefault();
          return false;
        } else if (e.which === 13) {
          document.activeElement.querySelector('a').click();
        } else {
          lastIndex = 0;
          document.querySelector(iAttrs.assignFocus).focus();
        }
      });
    }
  };
}]);


myApp.directive('loadItem', ['$q', 'config',
  function ($q, config) {
  return {
    restrict: 'A',
    scope: {
      loadItem: '@',
      typeUrl: '@'
    },
    link: function (scope, iElement) {
      var init = function () {
          if (scope.typeUrl === config.backgroundUrl) {
            iElement.addClass('no-poster');
            if (scope.$parent.videoUrl) {
              scope.$parent.trailerLink = true;
            }
          } else if (scope.typeUrl === config.thumbnailUrl) {
            scope.$parent.noImage = true;
          }
      };
      init();

      scope.$watch('loadItem', function (data) {
        if (data) {
          var image = new Image();

          image.onload = function () {
            iElement.addClass('ease-in');
            iElement[0].style.backgroundImage = 'url(' + image.src + ')';
            if (scope.typeUrl === config.backgroundUrl) {
             scope.$parent.trailerLink = false;
             scope.$parent.$apply('trailerLink');
            } else if (scope.typeUrl === config.thumbnailUrl) {
             scope.$parent.noImage = false;
             scope.$parent.$apply('noImage');
            }
          };
          image.onerror = function () {
            init();
          };
          image.src = scope.typeUrl + data;
        }
    });
    }
  };
}]);

myApp.directive('displayMode', ['$window', '$timeout', function ($window, $timeout) {
  return {
    restrict: 'A',
    scope: {
      displayMode: '='
    },
    template: '<div class="visible-xs"></div><div class="visible-sm"></div>' +
    '<div class="visible-md"></div><div class="visible-lg"></div>',
    link: function (scope, iElement) {
      scope.markers = iElement.find('div');
      var t;

      scope.updateDisplayMode = function () {
        angular.forEach(this.markers, function (elem) {
          if (elem.offsetParent !== null) {
            this.displayMode = elem.className;
          }
        }.bind(this));
      }.bind(scope);

      angular.element($window).bind('resize', function () {
        $timeout.cancel(t);
        t = $timeout(function () {
          this.updateDisplayMode();
          this.$apply(this.displayMode);
        }.bind(this), 300);
      }.bind(scope));

      scope.updateDisplayMode();
    }
  };
}])
