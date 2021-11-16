const { src, dest, series, parallel } = require('gulp')
const clean = require('gulp-clean')
const pug = require('gulp-pug')
const prettyHtml = require('gulp-pretty-html')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const injectHtml = require('gulp-inject-in-html')
const server = require('gulp-webserver')
const watch = require('gulp-watch')
sass.compiler = require('node-sass')

// clean all files in dist folder
const cleanDist = () => {
  return src('dist', {
    allowEmpty: true,
    sourcemaps: true,
  }).pipe(clean())
}

// move files to dist folder
const moveFiles = () => {
  return src('public/**/*', {
    sourcemaps: true,
  }).pipe(dest('dist/'))
}

// compile pug to html and output
const pugCompile = () => {
  return src('src/**/*.pug', {
    sourcemaps: true,
  })
    .pipe(pug())
    .pipe(
      prettyHtml({
        indent_size: 2,
        indent_char: ' ',
        unformatted: true,
        extra_liners: [],
      })
    )
    .pipe(
      rename({
        dirname: '',
      })
    )
    .pipe(dest('dist/'))
}

// compile next gen js to es5 and then minify to output folder
const jsCompile = () => {
  return src('src/**/*.js', {
    sourcemaps: true,
  })
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    // .pipe(uglify())
    .pipe(
      rename({
        dirname: '',
        extname: '.js',
      })
    )
    .pipe(dest('dist/assets/js/'))
}

// compile sass/scss to css and then minify to output folder
const cssCompile = () => {
  return src(['src/**/*.sass', 'src/**/*.scss'], {
    sourcemaps: true,
  })
    .pipe(
      sass({
        outputStyle: 'compact',
      })
    )
    .pipe(
      rename({
        dirname: '',
        extname: '.min.css',
      })
    )
    .pipe(dest('dist/assets/css/'))
}

// inject js/css/html into html
const inject = () => {
  return src('dist/**/*.html', {
    sourcemaps: true,
  })
    .pipe(injectHtml())
    .pipe(
      prettyHtml({
        indent_size: 2,
        indent_char: ' ',
        unformatted: true,
        extra_liners: [],
      })
    )
    .pipe(dest('dist/'))
}

// config webserver
const webServer = () => {
  return src('dist/').pipe(
    server({
      host: 'localhost',
      port: 8000,
      livereload: true,
      open: true,
    })
  )
}

// watching action of adding/modifying/deleting files
const watching = () => {
  return watch(
    'src/**/*',
    { ignoreInitial: true },
    series(cleanDist, moveFiles, parallel(pugCompile, jsCompile, cssCompile), inject)
  )
}

exports.default = series(
  cleanDist,
  moveFiles,
  parallel(pugCompile, jsCompile, cssCompile),
  inject,
  webServer,
  watching
)
