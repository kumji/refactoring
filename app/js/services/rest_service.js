var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  }
};

var handlFailure = function(callback) {
  return function(data) {
    callback(data);
  };
};

module.exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    };

    Resource.prototype.create = function(resource, callback) {
      $http.post('/api/' + this.resourceName + '/add', resource)
        .then(handleSuccess(callback), handlFailure(callback));
    };

    Resource.prototype.getAll = function(callback) {
      $http.get('/api/' + this.resourceName + '/list')
        .then(handleSuccess(callback), handlFailure(callback));
    };

    Resource.prototype.update = function(resource, callback) {
      $http.put('/api/' + this.resourceName + '/update/' + resource.item, resource)
        .then(handleSuccess(callback), handlFailure(callback));
    };

    Resource.prototype.remove = function(resource, callback) {
      $http.delete('/api/' + this.resourceName +'/delete/' + resource.item)
        .then(handleSuccess(callback), handlFailure(callback));
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};