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
      var tripDurationSeconds = 120;
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
          document.getElementById("step").innerHTML = "<b>Trip completed<\/b>";
          document.getElementById("distance").innerHTML = "Miles: " + (d / 1609.344).toFixed(2);
          return;
        }
        var p = poly.GetPointAtDistance(d);
        if (k++ >= 180 / step) {
          map.panTo(p);
          k = 0;
        }
        marker.setPoint(p);
        document.getElementById("distance").innerHTML = "Miles: " + (d / 1609.344).toFixed(2) + speed;
        if (stepnum + 1 < dirn.getRoute(0).getNumSteps()) {
          if (dirn.getRoute(0).getStep(stepnum).getPolylineIndex() < poly.GetIndexAtDistance(d)) {
            stepnum++;
            var steptext = dirn.getRoute(0).getStep(stepnum).getDescriptionHtml();
            document.getElementById("step").innerHTML = "<b>Next:<\/b> " + steptext;
            var stepdist = dirn.getRoute(0).getStep(stepnum - 1).getDistance().meters;
            var steptime = dirn.getRoute(0).getStep(stepnum - 1).getDuration().seconds;
            var stepspeed = ((stepdist / steptime) * 2.24).toFixed(0);
            //step = stepspeed/2.5;
            speed = "<br>Current speed: " + stepspeed + " mph";
          }
        } else {
          if (dirn.getRoute(0).getStep(stepnum).getPolylineIndex() < poly.GetIndexAtDistance(d)) {
            document.getElementById("step").innerHTML = "<b>Next: Arrive at your destination<\/b>";
          }
        }
        setTimeout(function () {
          animate(d + step);
        }, tick);
      }

      GEvent.addListener(dirn, "load", function () {
        step = (dirn.getDistance().meters / tripDurationSeconds) / 10;
        console.log("step:" + step)
        document.getElementById("controls").style.display = "none";
        poly = dirn.getPolyline();
        eol = poly.Distance();
        map.setCenter(poly.getVertex(0), 17);
        map.addOverlay(new GMarker(poly.getVertex(0), G_START_ICON));
        map.addOverlay(new GMarker(poly.getVertex(poly.getVertexCount() - 1), G_END_ICON));
        marker = new GMarker(poly.getVertex(0), {icon: car});
        map.addOverlay(marker);
        var steptext = dirn.getRoute(0).getStep(stepnum).getDescriptionHtml();
        document.getElementById("step").innerHTML = steptext;
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
