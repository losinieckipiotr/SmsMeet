var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require("gulp-tslint");

var tsProject = ts.createProject('tsconfig.json', {});

gulp.task('build', function() {
  return tsProject.src()
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report({
      emitError: false
    }))
    .pipe(tsProject())
    .js.pipe(gulp.dest(tsProject.options.outDir));
});

gulp.task('watch', function() {
  gulp.watch(tsProject.config.include, ['build']);
});

gulp.task('fix', function() {
  return tsProject.src()
    .pipe(tslint({
      formatter: 'verbose',
      fix: true
    }))
    .pipe(tslint.report());
});
