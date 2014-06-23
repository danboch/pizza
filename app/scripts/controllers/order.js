app.controller('OrderCtrl', function ($scope, order, $cookies) {

  var username = $cookies.pizzauser;

  $scope.order = order;

  function totalPieces(pieces) {

    var total = 0;

    angular.forEach(pieces, function (piece) {
      total += piece;
    });

    return total;
  }

  $scope.addPiece = function (pizza) {

    if (!pizza.hasOwnProperty('pieces')) {
      pizza.pieces = {};
    }

    var pieces = pizza.pieces;

    if (totalPieces(pieces) >= 8) return;

    if (!angular.isUndefined(pieces[username])) {
      pieces[username]++;
    } else {
      pieces[username] = 1;
    }

    order.$update(order);
  }

  $scope.removePiece = function (pizza) {

    if (!pizza.hasOwnProperty('pieces')) {
      pizza.pieces = {};
    }

    var pieces = pizza.pieces;

    if (!angular.isUndefined(pieces[username]) && pieces[username] > 0) {
      pieces[username]--;
      order.$update(order);
    }
  }

  $scope.addPizza = function (pizzaName) {

    order.pizzas.push({name: pizzaName});

    order.$update(order);

  }

  $scope.removePizza = function(pizza){

    var index = order.pizzas.indexOf(pizza);

    order.pizzas.splice(index,1);

    order.$update(order);

  }

  $scope.updatePrice = function(){
    order.$update(order);
  }

});