// gulpjs configuration file

var gulp = require('gulp'),
    newer = require('gulp-newer'),
    del = require('del'),
    cssImport = require('gulp-cssimport'),
    cleancss = require('gulp-clean-css'),
    pleeease = require('gulp-pleeease'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    concat = require('gulp-concat'),
    // gulpCopy = require('gulp-copy'),
    size = require('gulp-size'),
    imagemin = require('gulp-imagemin');


// file locations
var source = 'source/',
    dest = 'flaskapp/',

    // define source/destination files for html
    html = {
        in: source + 'templates/*.html',
        out: dest + 'templates',
        options: { prefix: 1 }
    },

    js = {
        in: source + 'static/js/*.*',
        out: dest + 'static/js/',
        options: { prefix: 1 }
    },

    images = {
        in: source + 'static/images/*.*',
        out: dest + 'static/images/'
    },

    css = {
        in: source + 'static/css/*.*',
        out: dest + 'static/css/',
        pleeeaseOpts: {
            autoprefixer: { browsers: ['last 2 version', '>5%' ]},
            // pseudoElements: true,
            mqpacker: true,
            rem: ['16px'],
            minifier: false
        }
    },

    pyFiles = {
        in: source + '*.py',
        options: { prefix: 1 }
    };



// Define Tasks
gulp.task('clean', function () {
    "use strict";
    del([dest + '*']).then(paths => {
        console.log('Deleted files and folders:\n',
                    paths.join('\n'));
    });
});


gulp.task('python', function() {
    "use strict";
    // return gulp.src(pyFiles.in)
    //     .pipe(newer(dest))
    //     .pipe(gulpCopy(dest, pyFiles.options))
    //     .pipe(gulp.dest(dest));
    return gulp.src(pyFiles.in)
        .pipe(newer(dest))
        .pipe(gulp.dest(dest));
});

gulp.task('html', function () {
    "use strict";
    return gulp.src(html.in)
        .pipe(newer(html.out))
        // .pipe(gulpCopy(dest, html.options))
        .pipe(gulp.dest(html.out))
});

gulp.task('js', function () {
    "use strict";
    return gulp.src(js.in)
        .pipe(newer(js.out))
        .pipe(size({title: 'JavaScript in: '}))
        // .pipe(gulpCopy(dest, js.options))
        .pipe(size({title: 'JavaScript out: '}))
        .pipe(gulp.dest(js.out))
});

gulp.task('css', function () {
    "use strict";
    return gulp.src(css.in)
        .pipe(concat('styles.css'))
        .pipe(cssImport())
    //     .pipe(cleancss())
    //     .pipe(gulp.dest(css.out));

    // return gulp.src(css.in)
        .pipe(size({title: 'CSS in: '}))
        .pipe(pleeease(css.pleeeaseOpts))
        .pipe(size({title: 'CSS out: '}))
        .pipe(gulp.dest(css.out))
});

gulp.task('images', function () {
    "use strict";
    return gulp.src(images.in)
        .pipe(newer(images.out))
        .pipe(size({title: 'Image In: '}))
        .pipe(imagemin())
        .pipe(size({title: 'Image Out: '}))
        .pipe(gulp.dest(images.out));
});


gulp.task('default', ['images', 'python', 'html', 'css', 'js'], function () {
});