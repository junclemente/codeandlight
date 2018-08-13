// gulpjs configuration file

var gulp = require('gulp'),
    newer = require('gulp-newer'),
    del = require('del'),
    cssImport = require('gulp-cssimport'),
    cleancss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    gulpCopy = require('gulp-copy'),
    size = require('gulp-size'),
    imagemin = require('gulp-imagemin');


// file locations
var source = 'source/',
    dest = 'flaskapp/',

    // define source/destination files for html
    html = {
        in: source + 'templates/*.html',
        out: dest,
        options: { prefix: 1 }
    },

    js = {
        in: source + 'static/js/*.js',
        out: dest,
        options: { prefix: 1 }
    },

    images = {
        in: source + 'static/images/*.*',
        out: dest + 'static/images/'
    },

    css = {
        // in: source + 'static/css/*.*',
        in: source + 'static/css/styles.css',
        // watch: [source + 'static/css/*']
        out: dest + 'static/css/'
    },

    pyFiles = {
        in: source + '**/*.*',
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
    return gulp.src(pyFiles.in)
        .pipe(newer(dest))
        .pipe(gulpCopy(dest, pyFiles.options))
        .pipe(gulp.dest(dest));
});

gulp.task('html', function () {
    "use strict";
    return gulp.src(html.in)
        .pipe(newer(dest))
        .pipe(gulpCopy(dest, html.options))
        .pipe(gulp.dest(dest));
});

gulp.task('js', function () {
    "use strict";
    return gulp.src(js.in)
        .pipe(newer(dest))
        .pipe(gulpCopy(dest, js.options))
        .pipe(gulp.dest(dest))
});

gulp.task('css', function () {
    "use strict";
    return gulp.src(css.in)
        // .pipe(concat('styles.css'))
        .pipe(cssImport())
        .pipe(cleancss())
        .pipe(gulp.dest(css.out));
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


gulp.task('default', ['images', 'html', 'css', 'js', 'python'], function () {
});