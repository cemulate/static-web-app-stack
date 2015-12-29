// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

var gulp    = require('gulp');
var del     = require('del');
var babel   = require('gulp-babel');
var es2015  = require('babel-preset-es2015');
var gutil   = require('gulp-util');
var concat  = require('gulp-concat');
var es      = require('event-stream');

var runSeq  = require('run-sequence');
var connect = require('gulp-connect');

var ghpages = require('gulp-gh-pages');

gulp.task('clean', function () {
    // Clear the destination folder
    return del(['dist/**/*.*']);
});

gulp.task('copy', function () {
    return gulp.src(['src/*.*']).pipe(gulp.dest('dist'))
});

gulp.task('scripts', function () {
    // Concatenate, babelify and copy all JavaScript (except vendor scripts)
    return gulp.src(['src/js/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('frontend', function() {
    var frontendPackages = ["foundation-sites", "jquery"];

    var glob = "node_modules/+(" + frontendPackages.join("|") + ")/**/*.*";
    gutil.log(glob);

    return gulp.src([glob])
        .pipe(gulp.dest('dist/lib'));
});

// Dev server

gulp.task('watch', function() {
    gulp.watch('src/*.*', ['copy']);
    gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('server', function() {
    return connect.server({
        root: 'dist'
    });
});

// gh-pages

gulp.task('ghpages', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghpages());
});

gulp.task('dist', function(cb) {
    runSeq('clean', ['copy', 'frontend', 'scripts'], cb);
});

gulp.task('default', function(cb) {
    runSeq('clean', ['copy', 'frontend', 'scripts'], 'watch', 'server', cb);
});
