/**
 * @ngdoc overview
 * @name pizzaApp
 * @description
 * # pizzaApp
 *
 * Main module of the application.
 */

var app = angular
  .module('pizzaApp', [ "firebase", 'ui.router', 'ngCookies', 'nvd3ChartDirectives', 'timer']);


app.config(function ($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider

    .state('orders', {
      abstract: true,
      url: '/orders',
      template: '<ui-view></ui-view>',
      resolve: {
        orders: function ($firebase) {
          return $firebase(new Firebase("https://sizzling-fire-926.firebaseio.com/pizza/orders"));
        }
      }
    })
    .state('orders.index', {
      url: "/",
      templateUrl: 'views/orders.html',
      controller: "OrdersCtrl"
    })
    .state('orders.show', {
      url: "/{id}",
      templateUrl: 'views/order.html',
      controller: 'OrderCtrl',
      resolve: {
        order: function ($stateParams, $firebase) {
          return $firebase(new Firebase("https://sizzling-fire-926.firebaseio.com/pizza/orders/" + $stateParams.id));
        }
      }
    })
    .state('orders.summary', {
      url: "/{id}/summary",
      templateUrl: 'views/order-summary.html',
      controller: 'SummaryCtrl',
      resolve: {
        order: function ($stateParams, $firebase) {
          return $firebase(new Firebase("https://sizzling-fire-926.firebaseio.com/pizza/orders/" + $stateParams.id));
        }
      }
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

      if (toState.name !== 'login' && !$cookies.pizzauser) {
        $state.go('login');
      } else {
        $rootScope.username = $cookies.pizzauser;
      }

    });
  });
