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
    server = require('./server.js'),
    env = '',
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
  var stream = gulp.src([
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
  .pipe(gulp.dest('app/styles'));
  if (env === 'dev') {
    return stream.pipe(livereload(reloadPort))
    .on('error', function (err) {
      throw err;
    });
  }
  return stream;
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
  var stream =  gulp.src('src/scripts/**/*.js')
  // sourcemap added
  .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('app/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('app/scripts'));
  if (env === 'dev') {
    return stream.pipe(livereload(reloadPort))
    .on('error', function (err) {
      throw err;
    });
  }
  return stream;
});

/*html task*/
gulp.task('html', function(){
  var stream = gulp.src('src/*.html')
  .pipe(gulp.dest('app/'));
  if (env === 'dev') {
    return stream.pipe(livereload(reloadPort))
    .on('error', function (err) {
      throw err;
    });
  }
  return stream;
});

/*ng template task*/
gulp.task('ngTemplate', function(){
  var stream =  gulp.src('src/views/**/*.html')
  .pipe(gulp.dest('app/views/'));
  if (env === 'dev') {
    return stream.pipe(livereload(reloadPort))
    .on('error', function (err) {
      throw err;
    });
  }
  return stream;
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

gulp.task('dev', function () {
  env = 'dev';
  return;
});

gulp.task('pro', function () {
  env = 'pro';
  return;
});

/*server task*/
gulp.task('server', function () {
  server.listen(port);
  console.log('>>>',' Server started... on localost:', port, ' <<<');
});

/*default*/
gulp.task('default', [
  'dev',
  'server',
  'fonts',
  'scripts',
  'html',
  'less',
  'ngTemplate',
  'ngDependencies',
  'watch'
  ]);

/*production*/
gulp.task('heroku:production', [
  'pro',
  'fonts',
  'scripts',
  'html',
  'less',
  'ngTemplate',
  'ngDependencies',
  ], function (){
    return;
  });
