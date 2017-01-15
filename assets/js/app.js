var liveListApp = angular.module('liveListApp', ['ngRoute']);

// ROUTE PROVIDER

liveListApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/settings', {
      controller: 'cSettings'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    });
  }
]);

// MENU CONTROLLER

liveListApp.controller('menuCtrl', function($scope, $location) {
  var path = "/" + window.location.pathname.split('/')[1];
  if (path == '/') {
    $scope.menuHome = "pure-menu-selected";
    $scope.menuSettings = "";
  } else if (path == '/settings') {
    $scope.menuHome = "";
    $scope.menuSettings = "pure-menu-selected";
  }
});

// PRODUCT CONTROLLER

liveListApp.controller('productCtrl', ['$scope', 'ProductService', 'CategoryService', function($scope, ProductService, CategoryService) {
  $scope.formData = {};
  $scope.categories = [];
  $scope.products = [];
  CategoryService.getCategories().then(function(response) {
    $scope.categories = response;
  });
  ProductService.getProducts().then(function(response) {
    $scope.products = response;
  });
  $scope.addProduct = function(isValid) {
    if (isValid) {
      ProductService.addProduct($scope.formData).then(function(response) {
        $scope.products.push({
          id: response.data.id,
          name: $scope.formData.name,
          category: $scope.formData.category,
          link: $scope.formData.link,
          ff: $scope.formData.ff,
          currentPrice: $scope.formData.currentPrice,
          updatedAt: response.data.updatedAt
        });
        $scope.formData = {};
      }).catch(function(err) {
        console.log("Error: ", err.data.details);
        if (err.data.originalError.code == 23505) {
          $scope.error = "Error: Product already exists!";
          $scope.formData = {};
          $timeout(function() {
            $scope.error = "";
          }, 2000);
        }
      });
    }
  };
  $scope.updatePrice = function(pid) {
    var index = $scope.products.findIndex(function(e) {
      return e.id == pid;
    });
    var data = $scope.products[index];
    ProductService.updatePrice(pid).then(function(response) {
      $scope.products.splice(index, 1);
      $scope.products.splice(index, 0, response.data);
    });
  };
  $scope.removeProduct = function(cid) {
    var index = $scope.products.findIndex(function(e) {
      return e.id == cid;
    });
    if (confirm("Confirm to delete the product ''" + $scope.products[index].name + "' ?")) {
      ProductService.removeProduct(cid).then(function(response) {
        $scope.products.splice(index, 1);
      });
    }
  };
}]);

// CATEGORY CONTROLLER

liveListApp.controller('cSettings', ['$scope', '$rootScope', '$timeout', 'CategoryService', function($scope, $rootScope, $timeout, CategoryService) {
  $scope.formData = {};
  $scope.categories = [];
  CategoryService.getCategories().then(function(response) {
    $scope.categories = response;
  });
  $scope.addCategory = function(isValid) {
    if (isValid) {
      CategoryService.addCategory($scope.formData).then(function(response) {
        $scope.categories.push({
          itemName: $scope.formData.value.toLowerCase()
        });
        $scope.formData = {};
      }).catch(function(err) {
        console.log("Error: ", err.data.details);
        if (err.data.originalError.code == 23505) {
          $scope.error = "Error: Category already exists!";
          $scope.formData = {};
          $timeout(function() {
            $scope.error = "";
          }, 2000);
        }
      });
    }
  };
  $scope.removeCategory = function(cid) {
    var index = $scope.categories.findIndex(function(e) {
      return e.id == cid;
    });
    if (confirm("Confirm to delete the category ''" + $scope.categories[index].itemName + "' ?")) {
      CategoryService.removeCategory(cid).then(function(response) {
        $scope.categories.splice(index, 1);
      });
    }
  };
}]);

// USER CONTROLLER

liveListApp.controller('uSettings', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {
  $scope.formData = {};
  $scope.users = [];
  UserService.getUsers().then(function(response) {
    $scope.users = response;
  });
}]);

// USER SERVICE

liveListApp.factory('UserService', function($http, $q) {
  return {
    getUsers: function() {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/users'
      }).then(function(response) {
        defer.resolve(response.data);
      }, function(response) {
        defer.reject(response);
      });
      return defer.promise;
    }
  }
});

// CATEGORY SERVICE

liveListApp.factory('CategoryService', function($http, $q) {
  return {
    getCategories: function() {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/categories'
      }).then(function(response) {
        defer.resolve(response.data);
      }, function(response) {
        defer.reject(response);
      });
      return defer.promise;
    },
    addCategory: function(category) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: '/category/add',
        data: category
      }).then(function(response) {
        defer.resolve(response);
      }, function(response) {
        defer.reject(response);
      });
      return defer.promise;
    },
    removeCategory: function(id) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: '/category/remove',
        data: {
          value: id
        }
      }).then(function(response) {
        defer.resolve(response);
      }, function(response) {
        defer.reject(response);
      });
      return defer.promise;
    }
  }
});

// PRODUCT SERVICE

liveListApp.factory('ProductService', function($http, $q) {
  return {
    getProducts: function() {
      var defer = $q.defer();
      $http({
        method: 'GET',
        url: '/products'
      }).then(function(response) {
        defer.resolve(response.data);
      }, function(response) {
        defer.reject(response);
      });
      return defer.promise;
    },
    addProduct: function(product) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: '/product/add',
        data: product
      }).then(function(response) {
        defer.resolve(response);
      }, function(response) {
        defer.reject(response);
      });
      return defer.promise;
    },
    updatePrice: function(id) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: '/product/update',
        data: {
          id: id
        }
      }).then(function(response) {
        defer.resolve(response);
      }, function(response) {
        defer.reject(response);
      });
      return defer.promise;
    },
    removeProduct: function(id) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: '/product/remove',
        data: {
          id: id
        }
      }).then(function(response) {
        defer.resolve(response);
      }, function(response) {
        defer.reject(response);
      });
      return defer.promise;
    }
  }
});
