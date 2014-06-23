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
  .module('pizzaApp', [ "firebase", 'ui.router', 'ngCookies']);


app.config(function ($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('orders', {
      url: "/orders",
      templateUrl: 'views/orders.html',
      controller: "OrdersCtrl"
    })
    .state('order', {
      url: "/orders/{id}",
      templateUrl: 'views/order.html',
      controller: 'OrderCtrl'
    })
    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller: 'LoginCtrl'
    })

});

app.run(
  function ($rootScope, $cookies, $state) {

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {

      if(toState.name !== 'login' && !$cookies.pizzauser){
        $state.go('login');
      }else{
        $rootScope.username = $cookies.pizzauser;
      }

    });
  });
