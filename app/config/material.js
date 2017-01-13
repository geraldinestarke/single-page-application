(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    .config(config)
  ;

  function config($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('grey', {
        default: '700',
        'hue-1': '900'
      })
      .accentPalette('orange', {
        default: '500'
      })
    ;
  }
}());
