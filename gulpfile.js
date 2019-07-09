const {
  port,
  root,
  output
} = require('./config/base')

const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const cleanCSS = require('gulp-clean-css')
const sourcemap = require('gulp-sourcemaps')

gulp.task('minify-css', cb => {
  return gulp.src('dist/resources/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie11'}))
    .pipe(gulp.dest('dist/resources/css'));
  cb()
});


gulp.task('uglify', cb => {
  gulp.src('dist/resources/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/resources/js'))
  cb()
});

gulp.task('connect', () => {
  connect.server({
    root,
    port,
    livereload: true
  })
})

gulp.task('es6', cb => {
  gulp.src('src/resources/es6/*.js')
    .pipe(sourcemap.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('src/resources/js'))
    .pipe(connect.reload())
  cb()
});

gulp.task('sass', function () {
  // nested, expanded, compact, compressed
  return gulp.src('src/resources/scss/*.scss')
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
        .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/resources/css'))
    .pipe(connect.reload())
});

gulp.task('output', (cb) => {
  rimraf('dist', function () {
    gulp.src([
      'src/**',
      '!src/resources/scss/**',
      '!src/resources/es6/**'
    ])
      .pipe(gulp.dest(output))
      .on('end', function () {
        cb()
      })
  })
})


gulp.task('watch', (cb) => {
  gulp.watch('src/resources/es6/*.js', gulp.parallel('es6'))
  gulp.watch('src/resources/scss/*.scss', gulp.parallel('sass'))
  cb()
})

// 打包
gulp.task('build', gulp.series('output', gulp.parallel('uglify', 'minify-css')));

// 开发
gulp.task('default', gulp.parallel('watch', 'connect'))
