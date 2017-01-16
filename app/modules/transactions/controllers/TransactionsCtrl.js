/* globals window */
(function () {
  'use strict';

  angular
    .module('SinglePageAppTransactions')
    .controller('TransactionsCtrl', TransactionsCtrl)
  ;

  function TransactionsCtrl(API, $location, $q, $timeout, $mdSidenav) {
    var vm = this;

    vm.transactions = [];
    vm.filter = {
      options: {
        debounce: 500
      }
    };
    vm.limitOptions = [10, {
      label: 'All',
      value: function () {
        return vm.transactions ? vm.transactions.length : 0;
      }
    }];
    vm.query = {
      order: 'nameToLower',
      limit: 10,
      page: 1,
      filter: '',
      totalcount: 0
    };
    vm.selected = [];

    vm.getTransactions = function (page, limit) {
      var _page = page || vm.query.page;
      var _limit = limit || vm.query.limit;
      return API.Swagger.getTransactions({
        page: parseInt(_page),
        pagesize: parseInt(_limit)
      })
        .then(function (res) {
          console.log(res);
          vm.transactions = res.transactions;
          vm.query.totalcount = res.meta.total_count;
          vm.query.totalpages = res.meta.total_pages;
        })
        .catch(function (err) {
          console.log(err);
        })
      ;
    };
    vm.toggleLimitOptions = function () {
      vm.limitOptions = vm.limitOptions ? undefined : [10];
    };
    vm.onPaginate = function (page, limit) {
      vm.selected = [];
      var promise = vm.getTransactions(page, limit);
      return promise;
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
    vm.toggleLeft = function () {
      $mdSidenav("left").toggle();
    };

    vm.getTransactions();
  }
}());
