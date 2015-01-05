'use strict';

var app = angular.module('inzetApp', [
  'inzetApp.controllers',
  'inzetApp.services',
  'ngRoute',
  'ngAnimate',
  'selectize',
  'ngTable'
]);

app.config(function($routeProvider, $locationProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl'
    })
    // wow many nasty
    .when('/login.html', {
      templateUrl: '',
      controller: function($location) {
        var path = $location.path();
        window.location = path;
      }
    })
    .when('/:term', {
      templateUrl: 'partials/term.html',
      controller: 'TermCtrl'
    })
    .when('/:term/:subject', {
      templateUrl: 'partials/subject.html',
      controller: 'SubjectCtrl'
    });

  // We don't want no fake hashbangs we want the real shite
  $locationProvider.html5Mode(true);
});


// Controllers
var appCtrls = angular.module('inzetApp.controllers', []);

// Services
var appServices = angular.module('inzetApp.services', []);
