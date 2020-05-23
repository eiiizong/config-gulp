const { src, dest, parallel, series, watch } = require('gulp'),
  connect = require('gulp-connect'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  pipeline = require('readable-stream').pipeline,
  gulpSass = require('gulp-sass');

gulpSass.compiler = require('node-sass');
const delhtml = () => del(['dist/*.html']);
const delcss = () => del(['dist/css/']);

const delall = () => del(['dist']);
const delImg = () => del(['dist/images']);
const delJs = () => del(['dist/js']);
const delLib = () => del(['dist/lib']);
const delCss = () => del(['dist/css']);
const delUtil= () => del(['dist/utils']);
// const delall = () => del(['dist']);

const server = () => {
  return connect.server({
    root: 'dist',
    livereload: true,
    port: 8002
  });
};

const scss = () => {
  return src('./src/styles/scss/index.scss')
    .pipe(sourcemaps.init())
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(
      autoprefixer({
        // 是否美化属性 默认为 true
        cascade: false
      })
    )
    .pipe(dest('./dist/css'))
    .pipe(cssnano())
    .pipe(rename('index.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist/css'));
};

const compileJS = () => {
  return src('./src/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('./dist/js'));
};

const compressionimg = () => {
  return src('./src/images/*')
    .pipe(imagemin())
    .pipe(dest('./dist/images/'));
};

const reload = () => src('./dist/*.html').pipe(connect.reload());
const copyjs = () => src('./src/js/*.js').pipe(dest('./dist/js'));
const copyUtil = () => src('./src/utils/**/*').pipe(dest('./dist/utils'));
const copyhtml = () => src('./src/*.html').pipe(dest('./dist/'));
const copycss = () => src('./src/css/*.css').pipe(dest('./dist/css/'));
const copyimg = () => src('./src/images/**/*').pipe(dest('./dist/images/'));
const copylib = () => src('./src/lib/**/*').pipe(dest('./dist/lib/'));
const copyfont = () => src('./src/fonts/*.ttf').pipe(dest('./dist/fonts/'));

const copy = parallel(copyhtml, copycss, copyfont, copylib, copyUtil);
// 检测文件
watch(['./src/*.html'], series(copyhtml, reload));
watch(['./src/styles/css/*.css'], series(delCss, copycss, reload));
watch(['./src/lib/**/*'], series(delLib, copylib, reload));
watch(['./src/styles/scss/**/*'], series(delCss, scss, reload));
watch(['./src/js/*.js'], series(delJs, compileJS, reload));
watch(['./src/images/**/*'], series(delImg, compressionimg, reload));
watch(['./src/utils/**/*'], series(delUtil, copyUtil, reload));

exports.css = scss;

exports.delall = delall;
exports.delImg = delImg;
exports.delCss = delCss;
exports.delLib = delLib;
exports.delJs = delJs;

exports.js = compileJS;
exports.img = compressionimg;
exports.server = server;

exports.default = series(delall, copy, scss, compressionimg, compileJS, server);
exports.dev = series(delall, copy, scss, compressionimg, compileJS, server);
