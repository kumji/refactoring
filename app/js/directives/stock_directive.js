module.exports = function(app) {
  app.directive('stockDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      template: '<h1>{{stockList}}</h1>',
      scope: {
        stockList: '@'
      },
      controller: function($scope) {
        $scope.stockList = 'Stock List'
      }
    };
  });
};