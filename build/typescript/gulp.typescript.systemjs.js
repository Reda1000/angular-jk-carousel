(function() {
  'use strict';

  var gulp = require('gulp'),
    systemJSBuilder = require('systemjs-builder'),
    size = require('gulp-size'),
    uglify = require('gulp-uglify'),
    saveLicense = require('uglify-save-license'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    builder = new systemJSBuilder('.tmp', 'system-config.js');

  gulp.task('systemjs-build-compile', [
			'templates', //Concatenates and minimizes all html files into a single js file (.tmp/scripts/templates.js) and save them in the angular cache
			'typescript' //Compiles typescript to javascript and copy the result in .tmp folder so files can be used by the systemjsbuilder
		],
    function(done) {
      builder.bundle('CarouselModule.js', 'dist/jk-carousel.js').then(function() {
        done();
      });
    }
  ); //Runs the systemjs builder

  gulp.task('systemjs-build', ['systemjs-build-compile'], function() {
    return gulp.src('dist/jk-carousel.js')
      .pipe(uglify({
        preserveComments: saveLicense,
        mangle: false
      }).on('error', gutil.log))
      .pipe(rename('jk-carousel.min.js'))
      .pipe(gulp.dest('dist'))
      .pipe(size());
  });

})();
