const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require('gulp-clean-css');

function compileSass() {
  return gulp
    .src("css/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest("css"));
}
gulp.task("sass", compileSass);

function watchSass() {
  gulp.watch("css/scss/**/*.scss", compileSass);
}
gulp.task("watch", watchSass);
