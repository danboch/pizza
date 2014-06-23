'use strict';

/**
 * @ngdoc function
 * @name pizzaApp.controller:TestowyCtrl
 * @description
 * # TestowyCtrl
 * Controller of the pizzaApp
 */
angular.module('pizzaApp')
  .controller('OrdersCtrl', function ($scope, $firebase, $state) {
      var orders = new Firebase("https://sizzling-fire-926.firebaseio.com/pizza/orders");
      
      $scope.orders = $firebase(orders);
      
      $scope.addNew = function() {    	  
        var newOrder = {
        	owner: $scope.username,
        	date: new Date()
        };
        
        $scope.orders.$add(newOrder).then(function(ref) {
        	$state.transitionTo('order', { id: ref.name() });
        });
      };
  });