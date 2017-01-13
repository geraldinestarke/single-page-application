(function () {
  'use strict';

  var _debug = window.debug('spa:app');
  _debug('start');

  angular
    .module('SinglePageApp', [
      'ngRoute',
      'ngMaterial',
      'ngMessages',
      'ngCookies',
      'md.data.table',
      'api',
      'SinglePageAppHome',
      'SinglePageAppTransactions'
    ]);

  _debug('end');
}());
