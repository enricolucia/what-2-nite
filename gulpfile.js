/*global require*/
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    protractor = require("gulp-protractor").protractor,
    karma = require('gulp-karma'),
    testFiles = 'unit_test/*.js',
    protTestFiles = 'e2e-tests/*.js',
    server = require('./server.js'),
    port = 8000,
    reloadPort = 35729,
    ngDependencies = [
      'angular',
      'angular-route',
      'angular-animate',
      'angular-resource',
      'angular-loader'
    ];

/*less task*/
gulp.task('less', function() {
  return gulp.src([
    'src/less/bootstrap/bootstrap.less',
    'src/less/bootstrap/theme.less',
    'src/less/app.less',
    ])
  .pipe(less())
  .pipe(concat('app.css'))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9',
      'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('app/styles'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('app/styles'))
  .pipe(livereload(reloadPort))
  .on('error', function (err) {
    throw err;
  });
});

/*protractor test task*/
gulp.task('protractor', function() {
  return gulp.src(testFiles)
    .pipe(protractor({
      configFile: 'e2e-tests/protractor.conf.js'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

/*unit test task*/
gulp.task('test', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

/*scripts task*/
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
  // sourcemap added
  .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('app/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/scripts'))
  .pipe(livereload(reloadPort));
});

/*html task*/
gulp.task('html', function(){
  return gulp.src('src/*.html')
  .pipe(gulp.dest('app/'))
  .pipe(livereload(reloadPort));
});

/*ng template task*/
gulp.task('ngTemplate', function(){
  return gulp.src('src/views/**/*.html')
  .pipe(gulp.dest('app/views/'))
  .pipe(livereload(reloadPort));
});

/*ngDependencies*/
gulp.task('ngDependencies', function () {
  ngDependencies.forEach(function (dep) {
    gulp.src('src/bower_components/' + dep + '/' + dep + '.js')
    .pipe(gulp.dest('app/scripts/vendor'));
  });
});

/*watch task*/
gulp.task('watch', ['server','ngDependencies'], function() {
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch([
    'src/less/*.less',
    'src/less/bootstrap/theme.less',
    'src/less/bootstrap/bootstrap.less'
    ], ['less']);
  gulp.watch(['src/*.html'], ['html']);
  gulp.watch(['src/views/**/*.html'], ['ngTemplate']);
});

/*font task*/
gulp.task('fonts', function () {
  return gulp.src('src/fonts/**.*')
  .pipe(gulp.dest('app/fonts/'));
});

/*server task*/
gulp.task('server', function () {
  server.listen(port);
  // console.log('server started... on port ', port);
});

/*default*/
gulp.task('default', [
  'server',
  'fonts',
  'scripts',
  'html',
  'less',
  'ngTemplate',
  'ngDependencies',
  'watch'
  ]);
