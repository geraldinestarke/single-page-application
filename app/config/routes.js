(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    .config(config)
  ;

  function config($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'modules/home/views/homepage.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .when('/transactions', {
        templateUrl: 'modules/transactions/views/transactions.html',
        controller: 'TransactionsCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/transactions'
      })
    ;
  }
}());
