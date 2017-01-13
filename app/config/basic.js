(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    .config(config)
  ;

  function config($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(true);
    $httpProvider.useApplyAsync(true);
  }
}());
