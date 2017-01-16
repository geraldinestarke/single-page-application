(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    .factory('focus', focus)
    .service('PageService', PageService)
  ;

  function focus($timeout, $window) {
    return function (id) {
      // timeout makes sure that is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function () {
        var element = $window.document.getElementById(id);
        if (element) {
          element.focus();
        }
      });
    };
  }
  function PageService() {
    var vm = this;

    vm.currentPage = '/home';

    // returns true if current page is equal to page
    vm.isCurrentPage = function (page) {
      var res = vm.currentPage.match(page);
      return res && res.length > 0;
    };
    // change the current page value to page
    vm.changeCurrentPage = function (page) {
      vm.currentPage = page;
    };
  }
}());
