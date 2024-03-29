const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const terser = require("gulp-terser");

function compileCSS() {
  return gulp
    .src("css/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest("css"));
}
gulp.task("css", compileCSS);

function compileJS() {
  return gulp.src("js/scripts/*.js")
    .pipe(terser())
    .pipe(gulp.dest("js"));
}
gulp.task("js", compileJS);

function watch() {
  gulp.watch(["css/scss/**/*.scss", "js/scripts/*.js"], gulp.series('css', 'js'));
}
gulp.task("watch", watch);
