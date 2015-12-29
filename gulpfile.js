// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

var gulp    = require('gulp');
var babel   = require('gulp-babel');
var es2015  = require('babel-preset-es2015');
var gutil   = require('gulp-util');
var clean   = require('gulp-clean');
var concat  = require('gulp-concat');
var es      = require('event-stream');

var connect = require('gulp-connect');

gulp.task('clean', function () {
    // Clear the destination folder
    return gulp.src('dist/**/*.*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('copy', function () {
    // Copy all application files except *.less and .js into the `dist` folder
    return es.concat(
        gulp.src(['src/img/**'])
            .pipe(gulp.dest('dist/img')),
        gulp.src(['src/*.*'])
            .pipe(gulp.dest('dist'))
    );
});

gulp.task('scripts', function () {
    // Concatenate, babelify and copy all JavaScript (except vendor scripts)
    return gulp.src(['src/js/**/*.js', '!src/js/include.js'])
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

gulp.task('dist', ['clean', 'copy', 'frontend', 'scripts']);

// Development
gulp.task('default', ['clean', 'copy', 'frontend', 'scripts', 'watch', 'server']);
