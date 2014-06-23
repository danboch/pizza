'use strict';

describe('Controller: TestowyCtrl', function () {

  // load the controller's module
  beforeEach(module('pizzaApp'));

  var TestowyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestowyCtrl = $controller('TestowyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
