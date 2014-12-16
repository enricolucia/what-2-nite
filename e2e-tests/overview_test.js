'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /main when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/main");
  });


  describe('mainView', function() {

    beforeEach(function() {
      browser.get('index.html#/main');
    });


    it('should render main when user navigates to /main', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).
        toMatch(/What-2-Nite/);
    });

  });

});
