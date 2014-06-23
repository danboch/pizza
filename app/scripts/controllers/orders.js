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
        	date: new Date()
        };
        
        $scope.orders.$add(newOrder).then(function(ref) {
        	$state.transitionTo('order', { id: ref.name() });
        });
      };
  });