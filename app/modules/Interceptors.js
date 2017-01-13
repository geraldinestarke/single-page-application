(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    .factory('HttpRequestInterceptor', HttpRequestInterceptor)
  ;

  function HttpRequestInterceptor($rootScope, $cookies, $q) {
    return {
      request: function ($config) {
        return $config;
      },
      response: function (response) {
        return response;
      },
      responseError: function (response) {
        return $q.reject(response);
      }
    };
  }
}());
