module.exports = function(app) {
  app.controller('StocksController', ['$scope', 'Resource', function($scope, Resource) {
    $scope.stocks = []; //Conroller first load into the DOM, call ng-repeat this object
    var stockResource = Resource('stocks');

    $scope.getAll = function() {
      stockResource.getAll(function(err, data){
        if (err) return console.log(err);
        $scope.stocks = data;
      });
    };;


    $scope.createStock = function(stock) {
      stockResource.create(stock, function(err, data) {
        if (err) return console.log(err);
        $scope.stocks.push(data);
        $scope.newStock = null;
      });
    };

    $scope.updateStock = function(stock) {
      stockResource.update(stock, function(err){
        stock.editing = false;
        if (err) return console.log(err);
      });
    };

    $scope.deleteStock = function(stock) {
      stockResource.remove(stock, function(err){
        if (err) return console.log(err);
        $scope.stocks.splice($scope.stocks.indexOf(stock), 1);
      //  $scope.getAll();
      });
    };

    $scope.cancel = function(stock) {
      $scope.getAll();
      stock.editing = false;
    };
  }]);
};


 // $scope.getAll = function() {
 //      $http.get('/api/stocks/list')
 //        .then(function(res) {
 //          $scope.stocks = res.data;
 //        }, function(res) {
 //          console.log(res);
 //        });
 //    };
 //    $scope.createStock = function(stock) {
 //      $http.post('/api/stocks/add', stock) 
 //        .then(function(res) {
 //          console.log(res.data);
 //          $scope.stocks.push(res.data);
 //          $scope.newStock = null; //to reset 
 //        }, function(res) {
 //          console.log(res);
 //        });
 //    };


 //    $scope.updateStock = function(stock) {
 //      $http.put('/api/stocks/update/' + stock.item, stock)
 //        .then(function(res){
 //          delete stock.status;
 //          stock.editing = false; 
 //        }, function(res) {
 //          console.log(res);
 //          stock.editing = false; //default view
 //        })
 //    };

 //    $scope.deleteStock = function(stock) {
 //      $scope.stocks.splice($scope.stocks.indexOf(stock), 1);
 //      $http.delete('/subliapi/stocks/delete/' + stock.item)
 //        .then(function() {}, function(res){
 //          $scope.getAll();
 //          console.log(res);
 //        });
 //    };

 //    $scope.cancel = function(stock) {
 //      $scope.getAll();
 //      stock.editing = false;
 //    };

