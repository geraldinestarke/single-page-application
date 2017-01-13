(function () {
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var wiredep = require('wiredep');
  var wiredepStream = wiredep.stream;
  var series = require('stream-series');
  var del = require('del');
  var _package = require('../package.json');

  // clean app dist directory
  gulp.task('app:clean', function () {
    return del([
      './dist'
    ]);
  });
  // copy app directory to dist
  gulp.task('app:copy', ['app:clean', 'swagger'], function () {
    return gulp.src([
      './app/**/*.pug',
      './app/**/*.{ico,png,jpg}',
      './static/**/*',
      './static/.*/**/*',
      './app/web.config'
    ])
      .pipe(gulp.dest('./dist'))
    ;
  });
  // auto-add bower dependencies to the app index.html
  gulp.task('app:inject', ['app:copy', 'app:constants', 'app:compileModules'], function () {
    var appJsStream = gulp
      .src([
        './app/app.js',
        './app/**/*.js',
        '!./app/**/*.min.js',
        './app/**/*.css',
        '!./app/**/*.min.css',
        './dist/*.js',
        '!./dist/*.min.js'
      ], {read: true})
      .pipe(gulp.dest('./dist'))
    ;
    var appTemplateStream = gulp
      .src([
        './dist/**/*.html',
        '!./dist/index.html'
      ])
      .pipe($.ngTemplates({
        finename: 'templates.js',
        module: 'SinglePageApp',
        standalone: false
      }))
      .pipe(gulp.dest('./dist'))
    ;
    return gulp.src('./dist/index.pug')
      .pipe(wiredepStream({
        directory: './bower_components',
        ignorePath: '../',
        fileTypes: {
          // bugfix in progress: https://github.com/taptapship/wiredep/issues/243
          pug: {
            block: /(([ \t]*)\/\/-?\s*bower:*(\S*))(\n|\r|.)*?(\/\/-?\s*endbower)/gi,
            detect: {
              js: /script\(.*src=['"]([^'"]+)/gi,
              css: /link\(.*href=['"]([^'"]+)/gi
            },
            replace: {
              js: 'script(src=\'{{filePath}}\')',
              css: 'link(rel=\'stylesheet\', href=\'{{filePath}}\')'
            }
          }
        }
      }))
      .pipe($.inject(
        series(appJsStream, appTemplateStream),
        {relative: true}
      ))
      .pipe(gulp.dest('./dist'))
    ;
  });
  // dist modules html files
  gulp.task('app:compileModules', ['app:copy'], function () {
    return gulp.src('./dist/**/*.pug')
      .pipe($.pug({
        pretty: true
      }))
      .pipe(gulp.dest('./dist'))
    ;
  });
  // convert pug files to html
  gulp.task('app:compileIndex', ['app:inject'], function () {
    return gulp.src('./dist/index.pug')
      .pipe($.pug({
        pretty: true
      }))
      .pipe(gulp.dest('./dist'))
      .pipe($.livereload())
    ;
  });
  // config environment
  gulp.task('app:constants', ['app:clean'], function () {
    var envConfig = {};
    envConfig.PACKAGE = {
      name: _package.name,
      version: envConfig.VERSION || ''
    };
    envConfig.TOAST_TIMEOUT = envConfig.TOAST_TIMEOUT || 10000;
    envConfig.TITLE = envConfig.TITLE || '';
    return $.ngConstant({
      name: 'SinglePageApp',
      constants: envConfig,
      stream: true,
      deps: false
    })
      .pipe($.rename('constants.js'))
      .pipe(gulp.dest('./dist'))
    ;
  });
  // build app files
  gulp.task('app', ['app:copy', 'app:compileIndex', 'app:compileModules', 'app:constants']);
})();
