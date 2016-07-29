var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var js = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-ui/build/angular-ui.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-aria/angular-aria.js',
  'bower_components/angular-messages/angular-messages.js',
  'bower_components/angular-material/angular-material.js',
  'source/js/app.js',
  'source/js/controllers/**/*.js',
  'source/js/controllers/*.js',
  'source/js/services/*.js',
  'source/js/directives/*.js',
  'source/js/routes/*.js'
];

var scss = [
  'source/scss/main.scss',
  'bower_components/angular-ui/build/angular-ui.css',
  'bower_components/angular-material/angular-material.css'
];

gulp.task('default', function () {
  gulp.start('js');
  gulp.start('sass');
});


gulp.task('sass', function () {
  return gulp.src(scss)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('main.css'))
  .pipe(gulp.dest('../app/css'));
});

gulp.task('js', function () {
  return gulp.src(js)
  .pipe(concat('final.min.js'))
  .pipe(gulp.dest('../app/js'));
});
