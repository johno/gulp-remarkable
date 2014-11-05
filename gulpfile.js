var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-spawn-mocha');

gulp.task('lint', function () {
  gulp
    .src(['lib/*.js', 'test/*.js', 'index.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['lint'], function(){
  return test().on('error', function (e) {
    throw e;
  });
});

gulp.task('cover', ['lint'], function(){
  return test(true).on('error', function (e) {
    throw e;
  });
});

gulp.task('default', ['lint', 'test', 'cover']);

function test(cover){
  return gulp.src(['test/*.js'], {read: false})
    .pipe(mocha({
      R: 'spec',
      harmony: true,
      env: {'NODE_ENV': 'test'},
      istanbul: cover
    }))
    .on('error', console.warn.bind(console));
}
