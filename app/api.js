(function () {
  'use strict';

  angular
    .module('api', [
      'swagger-api'
    ])
    .factory('API', API)
  ;

  function API(SwaggerAPI) {
    return {
      Swagger: new SwaggerAPI()
    };
  }
})();
