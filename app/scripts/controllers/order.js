app.controller('OrderCtrl', function ($scope, order, $cookies)
{
    var username = $cookies.pizzauser;
    
    $scope.$on('elementClick.directive', function (angularEvent, event)
    {
        var pieces = angularEvent.targetScope.data;

        angularEvent.targetScope.data[event.index] = switchPiece(pieces[event.index]);

        $scope.$apply();

        order.$update(order);
    });

    function switchPiece(piece){
        if (piece.key == "") {
            piece.key = username;
        } else if (piece.key === username && canModifyOrder()) {
            piece.key = "";
        }

        return piece;
    }

    function buildPieces()
    {
        var pieces = [];
        for (var i = 0; i < 8; i++) {
            pieces.push({key: "", y: 1});
        }
        return pieces;
    }

    $scope.pizzaIsEaten = function(pizza){
        for(var i=0; i<8; i++){
            if(pizza.pieces[i].key == "") return false;
        }

        return true;
    }

    $scope.colorFunction = function ()
    {
        return function (d, i)
        {

            var takenChunkColor = 'rgba(255, 140 , 0, 0.1)',
                chunkColor = 'rgb(255, 140 , 0)';

            if (d.data.key === "") {
                return chunkColor;
            } else {
                return takenChunkColor;
            }
        };
    }

    $scope.xFunction = function ()
    {
        return function (d)
        {
            return d.key;
        };
    }

    $scope.yFunction = function ()
    {
        return function (d)
        {
            return d.y;
        };
    }


    var username = $cookies.pizzauser;

    order.deliveryTime = new Date(order.deliveryTime);

    $scope.order = order;

    function totalPieces(pieces)
    {

        var total = 0;

        angular.forEach(pieces, function (piece)
        {
            total += piece;
        });

        return total;
    }

    $scope.addPiece = function (pizza)
    {

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

    $scope.removePiece = function (pizza)
    {
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

    $scope.addPizza = function (pizzaName)
    {
        if (!canModifyOrder()) return;

        if (!order.hasOwnProperty('pizzas')) order.pizzas = [];
        order.pizzas.push({name: pizzaName, pieces: buildPieces()});

        order.$update(order);

    }

    $scope.removePizza = function (pizza)
    {

        if (!canModifyOrder()) return;
        var index = order.pizzas.indexOf(pizza);

        order.pizzas.splice(index, 1);

        order.$update(order);

    }

    function canModifyOrder()
    {
        return order.status == "open";
    }

    $scope.updatePrice = function ()
    {
        order.$update(order);
    }

    $scope.lockOrder = function ()
    {
        order.status = "locked";
        order.deliveryTime = new Date(new Date().getTime() + $scope.minutesToDelivery*60*1000);
        order.$update(order);
    }
    
    $scope.minutesToDelivery = 40;

    $scope.markOrdered = function ()
    {
        order.status = "ordered";
        order.deliveryTime = new Date(new Date().getTime() + $scope.minutesToDelivery*60*1000);
        order.$update(order);
    }
    
    $scope.timeToDelivery = function()
    {
    	return (new Date(order.deliveryTime).getTime()-new Date().getTime())/1000;	
    }
    
    $scope.showMap = function()
    {
    	return order.status == 'ordered' && $scope.timeToDelivery() > 0;
    }
    
    $scope.pizzaDelivered = function()
    {
    	return order.status == 'ordered' && $scope.timeToDelivery() <= 0;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    //////////////////////////////////////////////////////
    
    
    $scope.order.$on('value', function () {
        var numberOfPicas = 0;
        var piecesPerPerson = {};
        angular.forEach($scope.order.pizzas, function (value, key) {
          numberOfPicas++;
          angular.forEach(value.pieces, function (value, key) {
        	if(value.key != "") {
              piecesPerPerson[value.key] = (piecesPerPerson[value.key] ? piecesPerPerson[value.key] : 0) + value.y;
        	}
          });
        });
        

        $scope.summary = [];
        $scope.pricePerPiece = $scope.order.price / (numberOfPicas * 8);
        $scope.price = $scope.order.price;
        angular.forEach(piecesPerPerson, function (value, key) {
          $scope.summary.push({person: key, number: value, price: $scope.pricePerPiece * value});
        });


        if (GBrowserIsCompatible()) {
          var tripDurationSeconds = $scope.timeToDelivery();
          var map = new GMap2(document.getElementById("map"));
          map.addControl(new GMapTypeControl());
          map.setCenter(new GLatLng(0, 0), 2);
          var dirn = new GDirections();

          var step = 5;

          var tick = 100; // milliseconds
          var poly;
          var eol;
          var car = new GIcon();
          car.image = "http://www.hollywoodreporter.com/sites/default/files/2014/03/Rolling_Hasselhoff_Prop_a_l.jpg"
          car.iconSize = new GSize(122, 80);
          car.iconAnchor = new GPoint(0, 0);
          var marker;
          var k = 0;
          var stepnum = 0;
          var speed = "";

          var animate = function (d) {
            if (d > eol) {
              //document.getElementById("step").innerHTML = "<b>Trip completed<\/b>";
              //document.getElementById("distance").innerHTML = "Miles: " + (d / 1609.344).toFixed(2);
              return;
            }
            var p = poly.GetPointAtDistance(d);
            if (k++ >= 180 / step) {
              map.panTo(p);
              k = 0;
            }
            marker.setPoint(p);
            //document.getElementById("distance").innerHTML = "Miles: " + (d / 1609.344).toFixed(2) + speed;
            if (stepnum + 1 < dirn.getRoute(0).getNumSteps()) {
              if (dirn.getRoute(0).getStep(stepnum).getPolylineIndex() < poly.GetIndexAtDistance(d)) {
                stepnum++;
                var steptext = dirn.getRoute(0).getStep(stepnum).getDescriptionHtml();
                //document.getElementById("step").innerHTML = "<b>Next:<\/b> " + steptext;
                var stepdist = dirn.getRoute(0).getStep(stepnum - 1).getDistance().meters;
                var steptime = dirn.getRoute(0).getStep(stepnum - 1).getDuration().seconds;
                var stepspeed = ((stepdist / steptime) * 2.24).toFixed(0);
                //step = stepspeed/2.5;
                speed = "<br>Current speed: " + stepspeed + " mph";
              }
            } else {
              if (dirn.getRoute(0).getStep(stepnum).getPolylineIndex() < poly.GetIndexAtDistance(d)) {
                //document.getElementById("step").innerHTML = "<b>Next: Arrive at your destination<\/b>";
              }
            }
            setTimeout(function () {
              animate(d + step);
            }, tick);
          }

          GEvent.addListener(dirn, "load", function () {
            step = (dirn.getDistance().meters / tripDurationSeconds) / 10;
            console.log("step:" + step)
            //document.getElementById("controls").style.display = "none";
            poly = dirn.getPolyline();
            eol = poly.Distance();
            map.setCenter(poly.getVertex(0), 17);
            map.addOverlay(new GMarker(poly.getVertex(0), G_START_ICON));
            map.addOverlay(new GMarker(poly.getVertex(poly.getVertexCount() - 1), G_END_ICON));
            marker = new GMarker(poly.getVertex(0), {icon: car});
            map.addOverlay(marker);
            var steptext = dirn.getRoute(0).getStep(stepnum).getDescriptionHtml();
            //document.getElementById("step").innerHTML = steptext;
            setTimeout(function () {
              animate(0);
            }, 2000);
          });

          GEvent.addListener(dirn, "error", function () {
            alert("Location(s) not recognised. Code: " + dirn.getStatus().code);
          });

          $scope.start = function () {
            var startpoint = "rynek, kraków";
            var endpoint = "kamieńskiego 51, kraków";
            dirn.loadFromWaypoints([startpoint, endpoint], {getPolyline: true, getSteps: true});
          }

        }
      });
    
    

});