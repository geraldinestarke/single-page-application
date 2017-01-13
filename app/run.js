(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    .run(run)
  ;

  function run($rootScope, $location, $routeParams, PageService) {
    $rootScope.$on('$routeChangeSuccess', function () {
      PageService.changeCurrentPage($location.path());
    });
  }
})();
