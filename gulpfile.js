const { src, dest, series } = require('gulp')
const { resolve } = require('path')
const gulpSass = require('gulp-sass')(require('sass'))
const gulpSourcemaps = require('gulp-sourcemaps')
const gulpCssnano = require('gulp-cssnano')
const gulpAutoprefixer = require('gulp-autoprefixer')
const gulpRename = require('gulp-rename')
const gulpWebserver = require('gulp-webserver')

// 编译scss文件
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

function defaultTask(cb) {
  // place code for your default task here
  cb()
}

exports.default = series(compileScss, server)
