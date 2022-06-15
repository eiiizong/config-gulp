const { src, dest, series, parallel, watch } = require('gulp')
const { resolve } = require('path')
const gulpSass = require('gulp-sass')(require('sass'))
const gulpSourcemaps = require('gulp-sourcemaps')
const gulpCssnano = require('gulp-cssnano')
const gulpAutoprefixer = require('gulp-autoprefixer')
const gulpRename = require('gulp-rename')
const gulpWebserver = require('gulp-webserver')
// const gulpImagemin = require('gulp-imagemin')

const del = require('del')

// 编译scss文件npm install --save-dev gulp-imagemin
const compileScss = () => {
  const fileSrc = resolve(__dirname, 'src/styles/scss/index.scss')
  const fileDest = resolve(__dirname, 'dist/css')
  return src(fileSrc)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(
      gulpAutoprefixer({
        // 是否美化属性 默认为 true
        cascade: true,
      })
    )
    .pipe(dest(fileDest))
    .pipe(gulpCssnano())
    .pipe(gulpRename('index.min.css'))
    .pipe(gulpSourcemaps.write('./'))
    .pipe(dest(fileDest))
}

// 编译JS
const compileJs = () => {
  return src('./src/js/**/*').pipe(dest('./dist/js/'))
}

// 编译图片 压缩复制
const compileImages = () => {
  return (
    src('./src/images/**/*')
      // .pipe(
      //   gulpImagemin({
      //     progressive: true,
      //   })
      // )
      .pipe(dest('./dist/images/'))
  )
}

// 启动服务
const server = () => {
  const rootSrc = resolve(__dirname, 'dist')
  return src(rootSrc).pipe(
    gulpWebserver({
      host: '127.0.0.1',
      livereload: true,
      directoryListing: true,
      open: true,
      port: '8023',
      fallback: 'index.html',
    })
  )
}

// 删除之前文件
const delDist = () => del(['dist'])
const delHtml = () => del(['dist/*.html'])
const delCss = () => del(['dist/css/'])
const delImages = () => del(['dist/images'])
const delJs = () => del(['dist/js'])
const delLib = () => del(['dist/lib'])
const delUtils = () => del(['dist/utils'])

// 复制文件
const copyJs = () => src('./src/js/*.js').pipe(dest('./dist/js'))
const copyUtils = () => src('./src/utils/**/*').pipe(dest('./dist/utils'))
const copyHtml = () => src('./src/*.html').pipe(dest('./dist/'))
const copyCss = () => src('./src/styles/css/**/*').pipe(dest('./dist/css/'))
const copyImages = () => src('./src/images/**/*').pipe(dest('./dist/images/'))
const copyLib = () => src('./src/lib/**/*').pipe(dest('./dist/lib/'))
const copyFonts = () => src('./src/fonts/**/*').pipe(dest('./dist/fonts/'))

// 监听文件
watch(['./src/*.html'], series(delHtml, copyHtml))
watch(['./src/lib/**/*'], series(delLib, copyLib))
watch(
  ['./src/styles/scss/**/*', './src/styles/css/**/*'],
  series(delCss, copyCss, compileScss)
)
watch(['./src/js/*.js'], series(delJs, compileJs))
watch(['./src/images/**/*'], series(delImages, compileImages))
watch(['./src/utils/**/*'], series(delUtils, copyUtils))

exports.default = series(
  delDist,
  parallel(
    copyJs,
    copyUtils,
    copyHtml,
    copyCss,
    copyImages,
    copyLib,
    copyFonts
  ),
  compileScss,
  server
)
