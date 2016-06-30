var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/js/**/*.js']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['minjs']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('minjs', function (done) {
  gulp.src(
    [
      './www/js/app.js',
      './www/js/appconfig/routes.js',
      './www/js/baasbox/baasbox.service.js',
      './www/js/baasbox/baasbox.config.js',
      './www/js/error/error.service.js',
      './www/js/error/error.config.js',
      './www/js/login/login.controller.js',
      './www/js/logout/logout.controller.js',
      './www/js/tasks/detail.controller.js',
      './www/js/tasks/tasks.controller.js',
      './www/js/tasks/tasks.service.js'
    ])
    .pipe(concat('app.bundle.js'))
    .pipe(gulp.dest('./www/js/'))
    // Uglifying the bundled app doesn't work with this configuration.
    // Somehow the dependency injections break.
    //.pipe(rename('app.bundle.min.js'))
    //.pipe(uglify())
    //.pipe(gulp.dest('./www/js/'))
    .on('end', done);
});
