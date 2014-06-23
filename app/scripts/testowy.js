app.config(function ($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('testowy', {
      url: "/testowy",
      templateUrl: 'views/pizza.html',
      controller: "TestowyCtrl"});
});