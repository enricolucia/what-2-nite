/*global module*/
module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'src/bower_components/angular/angular.js',
      'src/bower_components/angular-mocks/angular-mocks.js',
      'src/bower_components/angular-animate/angular-animate.js',
      'src/bower_components/angular-resource/angular-resource.js',
      'src/bower_components/angular-route/angular-route.js',
      'src/scripts/**/*.js',
      'unit_tests/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    singleRun : true,

    plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
