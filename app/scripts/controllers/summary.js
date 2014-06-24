'use strict';

/**
 * @ngdoc function
 * @name pizzaApp.controller:TestowyCtrl
 * @description
 * # TestowyCtrl
 * Controller of the pizzaApp
 */
app.controller('SummaryCtrl', function ($scope, order) {

  console.log('summary');

  $scope.order = order;

  

});
