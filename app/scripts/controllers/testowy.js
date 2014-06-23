'use strict';

/**
 * @ngdoc function
 * @name pizzaApp.controller:TestowyCtrl
 * @description
 * # TestowyCtrl
 * Controller of the pizzaApp
 */
angular.module('pizzaApp')
  .controller('TestowyCtrl', function ($scope, $firebase) {
      var orders = new Firebase("https://sizzling-fire-926.firebaseio.com/pizza/orders");
      // Automatically syncs everywhere in realtime
      $scope.orders = $firebase(orders);




  });
