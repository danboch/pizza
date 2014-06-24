'use strict';

/**
 * @ngdoc function
 * @name pizzaApp.controller:TestowyCtrl
 * @description
 * # TestowyCtrl
 * Controller of the pizzaApp
 */
app.controller('OrdersCtrl', function ($scope, $firebase, $state, orders) {

      $scope.orders = orders;
      
      $scope.addNew = function() {    	  
        var newOrder = {
        	owner: $scope.username,
        	date: new Date(),
        	status: "open",
        	pizzas: [],
        	deliveryTime: new Date()
        };
        
        $scope.orders.$add(newOrder).then(function(ref) {
        	$state.transitionTo('orders.show', { id: ref.name() });
        });
      };
      
      $scope.go = function(key) {
    	  $state.transitionTo('orders.show', { id: key });  
      };
  });
