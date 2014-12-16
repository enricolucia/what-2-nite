// paginator module
/*global angular*/
var services = angular.module('myApp.paginator', []);

services.factory('Paginator', [function () {
  return function (callback, totalPages, currentPage, maxItems) {
    var paginator = {
      hasNext: function () {
        if (currentPage + 1 <= totalPages) {
          return true;
        } else {
          return false;
        }
      },
      hasPrevious: function () {
         if (currentPage - 1 >= 1) {
           return true;
         } else {
           return false;
         }
      },
      next: function () {
        if (this.hasNext()) {
          this.goTo(currentPage + 1);
        }
      },
      previous: function () {
        if (this.hasPrevious()) {
          this.goTo(currentPage - 1);
        }
      },
      goTo: function (index) {
        if (index <= totalPages) {
          callback(index);
          paginator.items = paginator._toShow();
        }
      },
      _toShow: function () {
        var middle = Math.floor(maxItems / 2);
        var items = [];
        if (totalPages < maxItems) {
          for (var x = 1; x <= totalPages; x++) {
            items.push(x);
          }
        } else if (currentPage > middle) {
          if ((currentPage - middle) >= 1) {
            for (var j = currentPage; j >= (currentPage - middle); j--) {
              items.push(j);
            }
          }
          if ((currentPage + 1 + middle) <= totalPages) {
            for (var i = currentPage + 1; i < (currentPage + 1 + middle); i++) {
              items.push(i);
            }
          }
        } else {
          for (var z = 1; z <= maxItems + 1; z++) {
            items.push(z);
          }
        }
        return items.sort(function (a, b) {
          return a - b;
        });
      }
    };
    paginator.items = paginator._toShow();
    return paginator;
  };
}]);
