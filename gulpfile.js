const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const lost = require('lost');
const autoprefixer = require('autoprefixer');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');
const size = require('gulp-size');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

/* Error notification */
const onError = function (err) {
    notify.onError({
        title: 'ERROR!!!!!!',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>',
        sound: 'basso',
    })(err);
    this.emit('end');
};

/* css */
function css() {
    return src('./assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(postcss([lost(), autoprefixer()]))
        .pipe(dest('./dist/css'))
        .pipe(minifyCSS())
        .pipe(size())
        .pipe(size({ gzip: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'CSS task complete', sound: 'tink', onLast: true }));
}

/* main js */
function js() {
    return src('./assets/js/app.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(
            babel({
                presets: ['@babel/env'],
            }),
        )
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(size())
        .pipe(size({ gzip: true }))
        .pipe(dest('./dist/js'))
        .pipe(notify({ message: 'JS task complete', sound: 'tink', onLast: true }));
}

/* plugins js */
function jsplugins() {
    return src('./assets/js/vendor/*.js')
        .pipe(uglify())
        .pipe(concat('plugins.min.js'))
        .pipe(size())
        .pipe(size({ gzip: true }))
        .pipe(dest('./dist/js'))
        .pipe(notify({ message: 'JSPLUGINS task complete', sound: 'tink', onLast: true }));
}

/* copy stuff */
function fonts() {
    return src('./assets/fonts/**/*')
        .pipe(dest('./dist/fonts'))
        .pipe(notify({ message: 'FONTS task complete', sound: 'tink', onLast: true }));
}
function favicons() {
    return src('./assets/favicons/**/*')
        .pipe(dest('./dist/favicons'))
        .pipe(notify({ message: 'FAVICONS task complete', sound: 'tink', onLast: true }));
}
function modernizr() {
    return src('./assets/js/modernizr-custom.js')
        .pipe(dest('./dist/js'))
        .pipe(notify({ message: 'MODERNIZR task complete', sound: 'tink', onLast: true }));
}

/* imagemin */
function img() {
    return src('./assets/img/**/*')
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
                }),
            ]),
        )
        .pipe(dest('./dist/img'))
        .pipe(notify({ message: 'IMG task complete', sound: 'tink', onLast: true }));
}

/* make SVG sprites */
function icons() {
    return src('./assets/icons/**/*.svg')
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        dest: '',
                        sprite: 'icons.svg',
                    },
                },
            }),
        )
        .pipe(dest('./dist/img'))
        .pipe(notify({ message: 'ICONS task complete', sound: 'tink', onLast: true }));
}

/* watch */
function watchit() {
    browserSync.init({
        proxy: 'https://test.local',
        https: {
            key: '/Users/dusan/Library/Application Support/Local/run/router/nginx/certs/test.local.key',
            cert: '/Users/dusan/Library/Application Support/Local/run/router/nginx/certs/test.local.crt',
        },
    });
    watch('./assets/scss/**/*.scss', css);
    watch('./assets/img/**/*', img);
    watch('./assets/icons/**/*.svg', icons);
    watch('./assets/js/*.js', js).on('change', browserSync.reload);
    watch('./assets/js/vendor/*.js', jsplugins);
    watch('./assets/fonts/**/*', fonts);
    watch('./assets/favicons/**/*', favicons);
    watch('./**/*.php').on('change', browserSync.reload);
}

exports.css = css;
exports.img = img;
exports.icons = icons;
exports.js = js;
exports.jsplugins = jsplugins;
exports.fonts = fonts;
exports.favicons = favicons;
exports.modernizr = modernizr;

exports.default = series(parallel(css, js, jsplugins, img, icons, fonts, favicons, modernizr), watchit);
