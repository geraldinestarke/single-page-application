(function () {
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();

  gulp.task('swagger:api', ['app:clean'], function () {
    return gulp.src('./swagger.yml')
      .pipe($.yaml())
      .pipe($.data(function (file) {
        var CodeGen = require('swagger-js-codegen').CodeGen;
        file.contents = new Buffer(
          CodeGen.getAngularCode({
            moduleName: 'swagger-api',
            className: 'SwaggerAPI',
            swagger: JSON.parse(file.contents)
          })
        );
      }))
      .pipe($.rename('swagger-api.js'))
      .pipe(gulp.dest('./dist'))
    ;
  });

  gulp.task('swagger:compile', ['app:clean', 'swagger:api']);

  // create angular services js file for client usage
  gulp.task('swagger', ['swagger:compile']);
})();
