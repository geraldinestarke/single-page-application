/* globals window */
(function () {
  'use strict';

  angular
    .module('SinglePageAppTransactions')
    .controller('TransactionsCtrl', TransactionsCtrl)
  ;

  function TransactionsCtrl(API, $location, $q, $timeout, $mdToast, $mdDialog, focus) {
    var _debug = window.debug('spa:modules:transactions:controllers:TransactionsCtrl');
    _debug('start');

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
      var __debug = window.debug('spa:modules:transactions:controllers:TransactionsCtrl:getCustomers');
      __debug('start');
      return API.Swagger.getTransactions()
        .then(function (res) {
          __debug('API.User.getApiCustomer().then()');
          vm.transactions = res.transactions;
          __debug('vm.transactions');
          __debug(vm.transactions);
          __debug('end');
        })
        .catch(function (err) {
          __debug('API.User.getApiCustomer().catch()');
          __debug(`err: ${err}`);
          __debug('end');
        })
      ;
    };
    vm.toggleLimitOptions = function () {
      vm.limitOptions = vm.limitOptions ? undefined : [50, 100, 200];
    };
    vm.focusInput = function () {
      vm.filter.show = true;
      focus('searchbar');
    };
    vm.onPaginate = function (page, limit) {
      var __debug = window.debug('spa:modules:transactions:controllers:TransactionsCtrl:onPaginate');
      __debug('start');
      vm.selected = [];
      var promise = vm.getRecords(page, limit);
      return promise
        .then(function () {
          __debug('end');
        })
      ;
    };
    vm.loadStuff = function () {
      vm.promise = $timeout(function () {
      }, 2000);
    };
    vm.onReorder = function (order) {
      /* eslint-disable no-console */
      console.log(`Scope Order: ${vm.query.order}`);
      console.log(`Order: ${order}`);
      /* eslint-enable no-console */
      vm.promise = $timeout(function () {
        vm.orders.data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a is equal to b
          return 0;
        });
      }, 2000);
    };

    vm.getTransactions()
      .then(function () {
        _debug('end');
      })
    ;
  }
}());
