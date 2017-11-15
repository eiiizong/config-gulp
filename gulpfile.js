"use strict";
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var cssnano     = require('gulp-cssnano');
var htmlmin     = require('gulp-htmlmin');
var less        = require('gulp-less');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var merge		= require('merge-stream');

//css
gulp.task('css', function () {
	var indexCss = gulp.src('./src/css/*.css')
	.pipe(cssnano())
	.pipe(gulp.dest('./dist/css/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    var otherCss = gulp.src('./src/demo/*/css/*.css')
	.pipe(cssnano())
	.pipe(gulp.dest('./dist/demo/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    return merge(indexCss, otherCss);
});

//less
gulp.task('less', function () {
	var indexLess = gulp.src('./src/less/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('./dist/demo/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    var otherLess = gulp.src('./src/demo/*/less/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('./dist/demo/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    return merge(indexLess, otherLess);
});

//js
gulp.task('js', function () {
	var indexJs = gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    var otherJs = gulp.src('./src/demo/*/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/demo/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    return merge(indexJs, otherJs);
});

//img
gulp.task('img', function () {
	var indexImg = gulp.src('./src/img/*.*')
	.pipe(gulp.dest('./dist/img/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    var otherImg = gulp.src('./src/demo/*/img/*.*')
	.pipe(gulp.dest('./dist/demo/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    return merge(indexImg, otherImg);
});

//html
gulp.task('html', function () {
	var indexHtml = gulp.src('./src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true, //取消空格和换行符
		removeComments: true //取消注释
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    var otherHtml = gulp.src('./src/demo/*/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true, //取消空格和换行符
		removeComments: true //取消注释
	}))
	.pipe(gulp.dest('./dist/demo/'))
	.pipe(browserSync.reload({
      stream: true
    }));

    return merge(indexHtml, otherHtml);
});


//启动浏览器
gulp.task('serve',['css', 'less', 'html', 'img', 'js'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch(["src/css/*.css"  , "./src/demo/*/css/*.css"], ['css']);
    gulp.watch(["src/less/*.less", "./src/demo/*/less/*.less"], ['less']);
    gulp.watch(["src/*.html"     , "./src/demo/*/*.html"], ['html']);
    gulp.watch(["src/img/*.*"    , "./src/demo/*/img/*.*"], ['img']);
    gulp.watch(["src/fonts/*.*"  , "./src/demo/*/less/*.less"], ['less']);
    gulp.watch(["src/js/*.js"    , "./src/demo/*/js/*.js"], ['js']);
});