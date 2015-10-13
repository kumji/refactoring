require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('stocks controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;
  //to test front-end
  beforeEach(angular.mock.module('stocksApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor=$controller;
  }));

  it('should be able to create a controller', function() {
    var controller = new $ControllerConstructor('StocksController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.stocks)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('StocksController', {$scope: $scope});
      $scope.newStock = {item:'beforetest'};
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request when getAll() is called', function() {
      $httpBackend.expectGET('/api/stocks/list').respond(200, [{item: 'test1', qty:3}, {item: 'test2'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.stocks[0].item).toBe('test1');
      expect($scope.stocks[0].qty).toBe(3);
      expect($scope.stocks[1].item).toBe('test2');


    });

    it('should be able to create a stock', function() {
      $httpBackend.expectPOST('/api/stocks/add', {item: 'test'}).respond(200, {_id: 1, item: 'test'});
      $scope.newStock = {item: 'test'};
      $scope.createStock({item: 'test'});
      $httpBackend.flush();
      expect($scope.stocks[0].item).toBe('test');
      expect($scope.newStock).toBe(null);
    });

    // it('should be able to delete a stock', function(){
    //   $httpBackend.expectDELETE('api/stocks/delete', {item: 'beforetest'}).respond(200, {item:'beforetest'});
    //   $scope.deleteStock({item:'beforetest'});
    //   $httpBackend.flush();
    //   expect($scope.stocks[0]).toBe(null);
    // });
    // it('should be able to update a stock', function(){
    //   $httpBackend.expect(PUT, '/api/stocks/update', {item: 'testest'}).respond(200, {item:'testest'});
    //   $scope.newStock = {item: 'testest'};
    //   $scope.updateStock(stock);
    //   $httpBackend.flush();
    //   expect($scope.stocks[0].item).toBe('testest');
    // })
  });
});