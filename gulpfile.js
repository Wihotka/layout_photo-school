const { src, dest, series, watch } = require('gulp');
const htmlMin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();

const clean = () => {
    return del(['dist']);
}

const fonts = () => {
    return src('src/fonts/**')
     .pipe(dest('dist/fonts'));
}

const images = () => {
    return src('src/images/**')
     .pipe(dest('dist/images'));
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(gulpif(argv.production, htmlMin({
            collapseWhitespace: true,
        })))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

const styles = () => {
    return src([
        'src/libs/**/*.css',
        'src/css/**/*.css'
    ])
        .pipe(gulpif(argv.production, sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(gulpif(argv.production, cleanCSS({
            level: 2,
        })))
        .pipe(gulpif(argv.production, sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

const scripts = () => {
    return src([
        'src/libs/**/*.js',
        'src/js/**/*.js'
    ])
        .pipe(gulpif(argv.production, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpif(argv.production, uglify({
            toplevel: true,
        }).on('error', notify.onError())))
        .pipe(gulpif(argv.production, sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
        }
    })
}

watch('src/**/*.html', htmlMinify);
watch('src/**/*.css', styles);
watch('src/**/*.js', scripts);

exports.default = series(clean, fonts, images, htmlMinify, styles, scripts, watchFiles);
