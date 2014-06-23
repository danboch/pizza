'use strict';

/**
 * @ngdoc function
 * @name pizzaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pizzaApp
 */
angular.module('pizzaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
