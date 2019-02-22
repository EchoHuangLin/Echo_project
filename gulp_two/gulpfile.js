var gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');
const connect = require('gulp-connect');

gulp.task('default', ["connect","watch",'all']);

gulp.task('minicss', function () {
    gulp.src('two/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    console.log("压缩css");
});

gulp.task('minihtml', function () {
    gulp.src('two/*.html')
    .pipe(htmlmin({ collapseWhitespace: true,minifyJS: true, minifyCSS: true}))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
    console.log("压缩html");
});

gulp.task('minijs', function () {
    gulp.src('two/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    console.log("压缩js");
  });

gulp.task('all', ['minicss', 'minijs', 'minihtml'], function () {
    console.log("任务执行完成");
  })

  gulp.task("watch",function(){
    gulp.watch("two/*.html",["minihtml"]);
})

gulp.task('connect', function() {
    connect.server();
  });