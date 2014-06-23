'use strict';

/**
 * @ngdoc overview
 * @name pizzaApp
 * @description
 * # pizzaApp
 *
 * Main module of the application.
 */

var app = angular
  .module('pizzaApp', [ "firebase", 'ui.router']);


app.config(function ($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('orders', {
      url: "/orders",
      templateURL: 'views/orders.html',
      controller: "OrdersCtrl"
    })
    .state('order.show', {
      url: "/{id}",
      templateURL: 'views/order.html',
      controller: 'OrderCtrl'
    })
    .state('login', {
      url: "/login",
      templateURL: "views/login.html",
      controller: 'LoginCtrl'
    })


})
