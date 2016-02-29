(function(){
	'use strict';

	var gulp = require('gulp'),
		tslint = require('gulp-tslint'),
    tslintStylish = require('gulp-tslint-stylish'),
		size = require('gulp-size');

	gulp.task('typescript-lint', function(){
		return gulp.src('src/**/*.ts')
			.pipe(tslint())
			.pipe(tslint.report(tslintStylish))
      .pipe(size());
	}); //Checks typescript syntax

})();
