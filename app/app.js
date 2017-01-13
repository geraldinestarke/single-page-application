(function () {
  'use strict';

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
}());
