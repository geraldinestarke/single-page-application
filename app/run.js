(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    .run(run)
  ;

  function run($rootScope, $location, $routeParams, PageService) {
    var _debug = window.debug('spa:run');
    _debug('start');
    $rootScope.$on('$routeChangeSuccess', function () {
      PageService.changeCurrentPage($location.path());
    });

    _debug('end');
  }
})();
