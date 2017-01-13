(function () {
  'use strict';

  angular
    .module('SinglePageAppTransactions')
    .controller('TransactionsCtrl', TransactionsCtrl)
  ;

  function TransactionsCtrl(API, $location, $q, $timeout) {

    var vm = this;
    vm.transactions = [];
    vm.filter = {
      options: {
        debounce: 500
      }
    };
    vm.limitOptions = [50, 100, 200, {
      label: 'All',
      value: function () {
        return vm.transactions ? vm.transactions.length : 0;
      }
    }];
    vm.query = {
      order: 'nameToLower',
      limit: 100,
      page: 1,
      filter: '',
      count: 0
    };

    vm.getTransactions = function () {
      return API.Swagger.getTransactions()
        .then(function (res) {
          vm.transactions = res.transactions;
        })
        .catch(function (err) {
          console.log(err);
        })
      ;
    };
    vm.loadStuff = function () {
      vm.promise = $timeout(function () {
      }, 2000);
    };

    vm.getTransactions();
  }
}());
