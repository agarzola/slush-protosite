// Gulp plugins:
var gulp = require('gulp')
var jade = require('gulp-jade')
var stylus = require('gulp-stylus')
var nib = require('nib')
var changed = require('gulp-changed')
var prefix = require('gulp-autoprefixer')
var uglify = require('gulp-uglify')
var plumber = require('gulp-plumber')
var browserSync = require('browser-sync')
var gulpIf = require('gulp-if')
var argv = require('yargs').argv

// Useful globs in handy variables:
var markupSrc = [
  'source/markup/**/*.jade',
  '!source/markup/_layout.jade',
  '!source/markup/partials{,/**}',
  '!source/markup/sections{,/**}',
  '!source/markup/features{,/**}' ]

var stylesSrc = [
  'source/stylesheets/**/*.styl',
  '!source/stylesheets/partials{,/**}',
  '!source/stylesheets/modules{,/**}' ]

var jsSrc = [
  'source/javascript/**/*.js',
  '!source/javascript/vendor{,/**}' ]

var imagesSrc = 'source/images/**/*.*'

// Aaaand we start taskin’
// By default, we build, serve, and watch for changes:
gulp.task('watch', ['build', 'browser-sync'], function () {
  gulp.watch(markupSrc[0], ['markup'])
  gulp.watch(stylesSrc[0], ['styles'])
  gulp.watch(jsSrc[0], ['javascript'])
  gulp.watch(imagesSrc, ['images'])
})

// Build the site:
gulp.task('build',
  [ 'markup',
    'styles',
    'javascript',
    'images' ]
)

// Generate markup:
gulp.task('markup', function () {
  gulp.src(markupSrc)
  .pipe(plumber())
  .pipe(jade({
    pretty: (argv.production ? false : true)
  }))
  .pipe(gulp.dest('build/'))
})

// Generate styles, add prefixes:
gulp.task('styles', function () {
  gulp.src(stylesSrc)
  .pipe(plumber())
  .pipe(stylus({
    use: [nib()],
    compress: (argv.production ? true : false)
  }))
  .pipe(prefix('last 2 versions', '> 1%'))
  .pipe(gulp.dest('build/stylesheets'))
})

// Copy javascript:
gulp.task('javascript', function () {
  gulp.src(jsSrc[0])
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('build/javascript'))
})
// TO-DO: Implement hinting & collation.

// Copy images to build dir:
gulp.task('images', function () {
  gulp.src(imagesSrc)
  .pipe(plumber())
  .pipe(gulp.dest('build/images'))
})

// Init browser-sync & watch generated files:
gulp.task('browser-sync', function () {
  browserSync.init(null, {
    server: {
      baseDir: './build'
    },
    files: [
      'build/**/*.html',
      'build/**/*.css',
      'build/**/*.js'
    ]
  })
})
