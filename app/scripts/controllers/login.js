'use strict';

/**
 * @ngdoc function
 * @name pizzaApp.controller:TestowyCtrl
 * @description
 * # TestowyCtrl
 * Controller of the pizzaApp
 */
angular.module('pizzaApp')

  .controller('LoginCtrl', function ($scope, $cookies, $rootScope, $state) {

    $scope.login = function(username){

      $cookies.pizzauser = username;
      $rootScope.username = username

      $state.go('orders');

    }

  });
