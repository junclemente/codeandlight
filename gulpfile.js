// gulpjs configuration file

'use strict';

var gulp = require('gulp'),
    newer = require('gulp-newer'),
    del = require('del'),
    cssImport = require('gulp-cssimport'),
    cleancss = require('gulp-clean-css'),
    pleeease = require('gulp-pleeease'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    htmlclean = require('gulp-htmlclean'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    imagemin = require('gulp-imagemin');


var source = 'source/',
    dest = 'flaskapp/',

    html = {
        in: source + 'templates/*.html',
        out: dest + 'templates/'
    },

    js = {
        in: source + 'static/js/*.js',
        out: dest + 'static/js/'
    },

    images = {
        in: source + 'static/images/**/*.*',
        out: dest + 'static/images/'
    },

    css = {
        in: source + 'static/css/*.css',
        out: dest + 'static/css/',
        pleeeaseOpts: {
            autoprefixer: { browsers: ['last 2 version', '>5%' ]},
            mqpacker: true,
            minifier: false
        }
    },

    pyFiles = {
        in: source + '*.py',
        options: { prefix: 1 }
    };



// Define Tasks
gulp.task('clean', function () {
    del([dest + '*']).then(paths => {
        console.log('Deleted files and folders:\n',
                    paths.join('\n'));
    });
});


gulp.task('python', function() {
    return gulp.src(pyFiles.in)
        .pipe(newer(dest))
        .pipe(gulp.dest(dest));
});

gulp.task('html', function () {
    return gulp.src(html.in)
        .pipe(newer(html.out))
        .pipe(size({title: 'HTML in: '}))
        .pipe(htmlclean())
        .pipe(size({title: 'HTML out: '}))
        .pipe(gulp.dest(html.out))
});

gulp.task('js', function () {
    return gulp.src(js.in)
        .pipe(newer(js.out))
        .pipe(size({title: 'JavaScript in: '}))
        .pipe(uglify())
        .pipe(size({title: 'JavaScript out: '}))
        .pipe(gulp.dest(js.out))
});

gulp.task('css', function () {
    return gulp.src(css.in)
        .pipe(concat('styles.css'))
        .pipe(cssImport())
        .pipe(size({title: 'CSS in: '}))
        .pipe(pleeease(css.pleeeaseOpts))
        .pipe(size({title: 'CSS out: '}))
        .pipe(gulp.dest(css.out))
});

gulp.task('images', function () {
    return gulp.src(images.in)
        .pipe(newer(images.out))
        .pipe(size({title: 'Image In: '}))
        .pipe(imagemin())
        .pipe(size({title: 'Image Out: '}))
        .pipe(gulp.dest(images.out));
});


gulp.task('default', ['images', 'python', 'html', 'css', 'js'], function () {
});