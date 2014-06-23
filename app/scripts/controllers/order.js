app.controller('OrderCtrl', function ($scope, order, $cookies) {

  var username = $cookies.pizzauser;
  
  order.deliveryTime = new Date(order.deliveryTime);

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
	if (!canModifyOrder()) return;  

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
	if (!canModifyOrder()) return;  
	if (!order.hasOwnProperty('pizzas')) order.pizzas = [];
    order.pizzas.push({name: pizzaName});

    order.$update(order);

  }

  $scope.removePizza = function(pizza){

	if (!canModifyOrder()) return;  
    var index = order.pizzas.indexOf(pizza);

    order.pizzas.splice(index,1);

    order.$update(order);

  }
  
  function canModifyOrder() {
	  return order.status == "open";
  }

  $scope.updatePrice = function(){
    order.$update(order);
  }
  
  $scope.lockOrder = function() {
	  order.status = "locked";
	  order.$update(order);
  }
  
  $scope.markOrdered = function() {
	  order.status = "ordered";
	  
	  order.$update(order);
  }

});