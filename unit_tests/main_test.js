'use strict';

describe('mainView', function() {

  beforeEach(module('myApp'));

  var scope,
      controller;

  describe('MainController', function () {
    beforeEach(inject(function($controller, $rootScope){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      scope = $rootScope.$new();
      controller = $controller;
    }));

    describe('main controller', function(){
      it('should ....', function() {
        //spec body
        var mainCtrl = controller('MainController', { $scope: scope });
        expect(mainCtrl).toBeDefined();
      });

    });
  });
});
