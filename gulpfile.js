(function () {
  'use strict';

  var debug = require('debug')('angularjs-frontend:gulp');
  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();

  require('./tasks/swagger');
  require('./tasks/app');
  require('./tasks/dist');

  debug('start');

  // watch client files and build when a file changes
  gulp.task('watch', ['app'], function () {
    $.livereload.listen();
    var watcher = gulp.watch('app/**/*', ['app']);
    watcher.on('change', function (event) {
      /* eslint-disable no-console */
      console.log(`File ${event.path} was ${event.type}, running tasks...`);
      /* eslint-enable no-console */
    });
  });
  // run the server
  gulp.task('run', function (done) {
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
      .use(require('connect-livereload')({port: 35729}))
      .use(serveStatic('./dist'))
      .use('/bower_components', serveStatic('./bower_components'))
      .use(serveIndex('./dist'));
    require('http').createServer(app)
      .listen(9000, function () {
        /* eslint-disable no-console */
        console.log('listening on http://localhost:9000');
        /* eslint-enable no-console */
        done();
      });
  });
  // default task
  gulp.task('default', ['run', 'watch']);

  debug('finished');
})();
