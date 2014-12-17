# What-2-Nite
[![Build Status](https://travis-ci.org/enricolucia/what-2-nite.svg)](https://travis-ci.org/enricolucia/what-2-nite)

A simple page application with restful API from [themoviedb.org] and AngularJs.
It lets you search and browse for your favourite movies based on your preferences, provindig tips for best movies to watch as well.

### Structure
  - Gulp task management implemented for build, watch and test tasks (e2e, unit-test)
  - Bower integration
  - Karma and Protractor implemented

### Configure
```sh
$ npm install
```
Install npm and bower dependencies
```sh
$ gulp
```
Starts the express server, plus creating the main 'app' folder where to serve all contents and watch changes
```sh
$ gulp test
```
Starts karma testings
```sh
$ gulp protractor
```
Starts protractor testings

### Todo's
 - e2e testings
 - unit testings
 - enhance mobile view

Any suggestions or bug reports is more than welcome!

### Tech

What-2-Nite use the following tools and libraries:

* Google Fonts 'Open Sans'
* Karma
* Protractor
* Bootstrap html/less
* Bower
* Node Express
* Selenium
* PhantomJS

### Compatibilities

Tested on latest Chrome and Firefox.

### Angular dependencies

What-2-Nite use the following angular dependencies:

* [ngAnimate]
* [ngRoute]
* [ngResource]

### Thanks to

I would like to thank again [themoviedb.org] for providing this API end point!

### License

MIT


**Free Software, Hell Yeah!**
[themoviedb.org]:http://themoviedb.org/
[ngRoute]:https://docs.angularjs.org/api/ngRoute
[ngAnimate]:https://docs.angularjs.org/api/ngAnimate
[ngResource]:https://docs.angularjs.org/api/ngResource
