"use strict"

const gulp = require("gulp");
const sass = require("gulp-sass");
const jshint = require("gulp-jshint");
const sassLint = require('gulp-sass-lint');


gulp.task("sass:watch", () => (
	gulp.watch("./static/**/*.scss",
		["sass:lint", "sass:compile"]
	)
));

gulp.task("sass:compile", () => (
	gulp.src("./static/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./static"))
));


gulp.task("sass:lint", () => (
  gulp.src('static/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
));

gulp.task("js:lint", () => (
  gulp.src('./static/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
));

gulp.task("sass", ["sass:lint", "sass:compile", "sass:watch"]);
gulp.task("lint", ["js:lint", "sass:lint"]);
gulp.task("default", ["sass"]);