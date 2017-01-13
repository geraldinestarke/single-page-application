(function () {
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var series = require('stream-series');
  var wiredep = require('wiredep');
  var del = require('del');

  // dist copy
  gulp.task('dist:copy', ['app:copy'], function () {
    return gulp.src([
      './bower_components/**/*.woff2',
      './bower_components/**/*.woff',
      './bower_components/**/*.tff'
    ])
      .pipe(gulp.dest('./dist/static'))
    ;
  });
  //auto-add bower concatenated dependencies to the app index.html
  gulp.task('dist:inject', ['dist:copy', 'app:constants', 'dist:compileModules'], function () {
    var appJsStream = gulp.src([
      './app/**/*.js',
      '!./app/**/*.min.js',
      './dist/*.js',
      '!./dist/*.min.js'
    ])
      .pipe($.concat('scripts.js'))
      .pipe($.rev())
      .pipe($.babel())
      .pipe($.uglify({
        mangle: false
      }))
      .pipe(gulp.dest('./dist/static/js'))
    ;
    var appCssStream = gulp.src([
      './app/**/*.css',
      '!./app/**/*.min.css'
    ])
      .pipe($.concatCss('styles.css'))
      .pipe($.rev())
      .pipe($.cleanCss())
      .pipe(gulp.dest('./dist/static/css'))
    ;
    var appTemplateStream = gulp.src([
      './dist/**/*.html',
      '!./dist/index.html'
    ])
      .pipe($.htmlmin({collapseWhitespace: true}))
      .pipe($.ngTemplates({
        filename: 'templates.js',
        module: 'SinglePageApp',
        standalone: false
      }))
      .pipe($.rev())
      .pipe($.uglify())
      .pipe(gulp.dest('./dist/static/js'))
    ;
    var vendorJsStream = gulp.src(wiredep().js)
      .pipe($.concat('vendor.js'))
      .pipe($.rev())
      .pipe($.uglify())
      .pipe(gulp.dest('./dist/static/js'))
    ;
    var vendorCssStream = gulp.src(wiredep().css)
      .pipe($.concatCss('vendor.css'))
      .pipe($.rev())
      .pipe($.cleanCss())
      .pipe(gulp.dest('./dist/static/css'))
    ;
    return gulp.src('./dist/index.pug')
      .pipe($.inject(
        series(vendorJsStream, vendorCssStream, appJsStream, appCssStream, appTemplateStream),
        {relative: true}
      ))
      .pipe(gulp.dest('./dist'))
    ;
  });
  // dist modules html files
  gulp.task('dist:compileModules', ['dist:copy'], function () {
    return gulp.src('./dist/**/*.pug')
      .pipe($.pug({
        pretty: true
      }))
      .pipe(gulp.dest('./dist'))
    ;
  });
  // dist index.html files
  gulp.task('dist:compileIndex', ['dist:inject'], function () {
    return gulp.src('./dist/index.pug')
      .pipe($.pug({
        pretty: true
      }))
      .pipe($.htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./dist'))
    ;
  });
  // dist post-clean unecessary files
  gulp.task('dist:post-clean', ['dist:compileIndex', 'dist:compileModules', 'dist:inject'], function () {
    return del([
      './dist/**/*.pug',
      './dist/modules',
      './dist/*.js',
      './dist/*.min.js'
    ]);
  });
  // dist app files
  gulp.task('dist', ['dist:copy', 'dist:compileIndex', 'dist:compileModules', 'app:constants', 'dist:post-clean']);
})();
