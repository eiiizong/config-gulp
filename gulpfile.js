const { src, dest, parallel, task, series, watch } = require('gulp'),
	connect = require('gulp-connect'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps'),
	cssnano = require('gulp-cssnano'),
	gulpLess = require('gulp-less'),
	LessAutoprefix = require('less-plugin-autoprefix'),
	rename = require('gulp-rename'),
	gulpSass = require('gulp-sass'),
	autoprefix = new LessAutoprefix({
		browsers: ['last 2 versions']
	});

gulpSass.compiler = require('node-sass');
const delhtml = () => del(['dist/*.html']);
const delcss = () => del(['dist/css/']);
const delall = () => del(['dist']);

const server = () => {
	return connect.server({
		root: 'dist',
		livereload: true,
		port: 8002
	});
};

const less = () => {
	return src('./src/styles/scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe(
			gulpSass({
				plugins: [autoprefix]
			}).on('error', gulpSass.logError)
		)
		.pipe(cssnano())
		.pipe(rename('style.min.css'))
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
watch(['./src/styles/css/*.css'], series(copycss, reload));
watch(['./src/lib/**/*'], series(copylib, reload));
watch(['./src/styles/scss/**/*'], series(less, reload));
watch(['./src/js/*.js'], series(copyjs, reload));
watch(['./src/images/**/*'], series(copyimg, reload));

exports.less = less;
exports.delall = delall;
exports.dev = series(copy, less, server);