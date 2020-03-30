const { src, dest, parallel, series, watch } = require('gulp'),
  connect = require('gulp-connect'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  gulpSass = require('gulp-sass');

gulpSass.compiler = require('node-sass');
const delhtml = () => del(['dist/*.html']);
const delcss = () => del(['dist/css/']);

const delall = () => del(['dist']);
const delCss = () => del(['dist/css']);
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
    .pipe(cssnano())
    .pipe(rename('index.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist/css'));
};

const reload = () => src('./dist/*.html').pipe(connect.reload());
const copyjs = () => src('./src/js/*.js').pipe(dest('./dist/js'));
const copyhtml = () => src('./src/*.html').pipe(dest('./dist/'));
const copycss = () => src('./src/css/*.css').pipe(dest('./dist/css/'));
const copyimg = () => src('./src/images/**/*').pipe(dest('./dist/images/'));
const copylib = () => src('./src/lib/**/*').pipe(dest('./dist/lib/'));
const copyfont = () => src('./src/fonts/*.ttf').pipe(dest('./dist/fonts/'));

const copy = parallel(copyimg, copyhtml, copycss, copyjs, copyfont, copylib);
// 检测文件
watch(['./src/*.html'], series(copyhtml, reload));
watch(['./src/styles/css/*.css'], series(delCss,copycss, reload));
watch(['./src/lib/**/*'], series(copylib, reload));
watch(['./src/styles/scss/**/*'], series(delCss,scss, reload));
watch(['./src/js/*.js'], series(copyjs, reload));
watch(['./src/images/**/*'], series(copyimg, reload));

exports.scss = scss;
exports.delall = delall;
exports.dev = series(delall,copy, scss, server);
