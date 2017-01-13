(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    .controller('MainCtrl', MainCtrl)
  ;

  function MainCtrl($log, PACKAGE) {
    var vm = this;
    vm.version = PACKAGE.version;
  }
}());
