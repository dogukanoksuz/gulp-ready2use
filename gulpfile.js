// GULPFILE.JS
// https://github.com/dogukanoksuz
// ready to use gulpfile.js for front-end developing

// importing node packages
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const runSequence = require('run-sequence');


// start browser-sync
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

// css tasks
gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
        .pipe(minifyCSS())
        .pipe(autoprefixer().on('error', function(e){
            console.log(e);
        }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// js tasks
gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(minifyJS().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// html tasks
gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// image tasks
gulp.task('img', () => {
    gulp.src('src/img/**/*')
        .pipe(minifyImg())
        .pipe(gulp.dest('dist/img'));
});

// font tasks
gulp.task('fonts', () => {
   gulp.src('src/fonts/**/*')
       .pipe(gulp.dest('dist/fonts'));
});

// clear old files
gulp.task('delete', () => del(['dist/css', 'dist/js', 'dist/img', 'dist/**/*.html']));

// let the gulp watch the changes of files
gulp.task('watch', () => {
    gulp.watch("src/css/**/*.css", ['css']);
    gulp.watch("src/js/**/*.js", ['js']);
    gulp.watch("src/img/**/*", ['img']);
    gulp.watch("src/**/*.html", ['html']);
});

// startup sequence, will be repeated
gulp.task('default', () => {
    runSequence(
        'delete',
        'html',
        'css',
        'js',
        'img',
        'fonts',
        'browser-sync',
        'watch'
    );
});
