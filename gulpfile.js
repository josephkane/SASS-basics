"use strict"

const gulp = require("gulp");
const sass = require("gulp-sass");
const jshint = require("gulp-jshint");
const sassLint = require('gulp-sass-lint');
const del = require("del");

const sourcePath = "./src";
const distributionPath = "./dist";
const jsPath = `${sourcePath}/**/*.js`;
const sassPath = `${sourcePath}/**/*.scss`;
const staticPath = ["${sourcePath}/**/*", `!${sassPath}`];

gulp.task("default", ["build"]);
gulp.task("build", ["clean", "static:copy", "sass:compile"]);
gulp.task("watch", ["static:watch", "sass:watch", "js:watch"]);
gulp.task("lint", ["js:lint", "sass:lint"]);


// UTILITIES
gulp.task("clean", () => (
  del(`${distributionPath}/**/*`)
));


// STATIC
gulp.task("static:copy", ["clean"], () => (
  gulp.src(["${sourcePath}/**/*", `!${sassPath}`])
    .pipe(gulp.dest(distributionPath))
));

gulp.task("static:watch", ["clean"], () => (
  gulp.src(staticPath, ["static:copy"])
));


// SASS

const sassCompile = () => {
  gulp.src(sassPath)
    .pipe(sass())
    .pipe(gulp.dest(distributionPath))
};

gulp.task("sass:watch", () => (
	gulp.watch(sassPath,
		["sass:lint", "sass:compile"]
	)
));

gulp.task("sass:compileAndClean", ["clean"], sassCompile);

gulp.task("sass:compile", sassCompile);

gulp.task("sass:lint", () => (
  gulp.src(sassPath)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
));


// JS
gulp.task("js:watch", () => (
  gulp.watch(jsPath, ["js:lint"])
));

gulp.task("js:lint", () => (
  gulp.src(jsPath)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
));
