'use strict';

var app = angular.module('inzetApp', [
  'inzetApp.controllers',
  'inzetApp.services',
  'ngRoute',
  'ngAnimate'
]);

app.config(function($routeProvider, $locationProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl'
    });

  // We don't want no fake hashbangs we want the real shite
  $locationProvider.html5Mode(true);
});


// Controllers
var appCtrls = angular.module('inzetApp.controllers', []);

// Services
var appServices = angular.module('inzetApp.services', []);
