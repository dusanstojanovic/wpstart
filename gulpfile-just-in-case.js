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

/* Error notification */
const onError = function (err) {
    notify.onError({
        title: 'ERROR!!!!!!',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>',
        sound: 'Basso',
    })(err);
    this.emit('end');
};

/* css */
function css() {
    return src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(postcss([lost(), autoprefixer()]))
        .pipe(minifyCSS())
        .pipe(size())
        .pipe(size({ gzip: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('./assets/css'))
        .pipe(notify({ message: 'CSS task complete', onLast: true }));
}

/* main js */
function js() {
    return src('./javascript/app.js')
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
        .pipe(dest('./assets/js'))
        .pipe(notify({ message: 'JS task complete', onLast: true }));
}

/* plugins js */
// prettier-ignore
function jsplugins() {
    return src('./javascript/plugins/*.js')
        .pipe(uglify())
        .pipe(concat('plugins.min.js'))
        .pipe(size())
        .pipe(size({ gzip: true }))
        .pipe(dest('./assets/js'))
        .pipe(notify({ message: 'JSPLUGINS task complete', onLast: true }));
}

/* imagemin */
function img() {
    return src('./images/*')
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
        .pipe(dest('./assets/images'))
        .pipe(notify({ message: 'IMG task complete', onLast: true }));
}

/* make SVG sprites */
function icons() {
    return src('./icons/**/*.svg')
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        dest: '',
                        sprite: 'icons-symbols.svg',
                    },
                },
            }),
        )
        .pipe(dest('./assets/img'))
        .pipe(notify({ message: 'ICONS task complete', onLast: true }));
}

/* watch */
function watchit() {
    watch('./sass/**/*.scss', css);
    watch('./img/*', img);
    watch('./icons/**/*.svg', icons);
    watch('./js/*.js', js);
    watch('./js/plugins/*.js', jsplugins);
}

exports.css = css;
exports.img = img;
exports.icons = icons;
exports.js = js;
exports.jsplugins = jsplugins;

exports.default = series(parallel(css, js, jsplugins, img, icons), watchit);
