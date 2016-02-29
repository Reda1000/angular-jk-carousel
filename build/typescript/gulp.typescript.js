(function() {
  'use strict';

  var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    size = require('gulp-size'),
    tsProject = ts.createProject('tsconfig.json'),
    typescriptFiles = ['typings/tsd.d.ts', 'src/app/**/*.ts'];

  gulp.task('typescript', ['typescript-lint'], function() {
    return gulp.src(typescriptFiles)
      .pipe(ts(tsProject))
      .pipe(gulp.dest('.tmp'))
      .pipe(size());
  }); //Compiles typescript to javascript

})();
