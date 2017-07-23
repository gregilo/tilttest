const autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    minify = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint');

gulp.task('lint', function() {
  return gulp.src(['src/scripts/*.js', '!src/scripts/vendor/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', notify.onError({message: 'ESLint Errors', onLast: true}));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(plumber())
    .pipe(concat('scripts.min.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({message: 'Scripts Compiled', onLast: true}));
});

gulp.task('plugins', function() {
  return gulp.src('src/scripts/vendor/*.js')
    .pipe(plumber())
    .pipe(concat('plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({message: 'Plugins Compiled', onLast: true}));
});

gulp.task('styles', function() {
  return sass('src/scss/styles.scss')
    .pipe(plumber())
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'safari >= 8']}))
    .pipe(gulp.dest('public/css'))
    .pipe(minify({cache: false, keepSpecialComments: false, processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'))
    .pipe(notify({message: 'Styles Compiled', onLast: true}));
});


gulp.task('watch', function() {
  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['styles']);
  gulp.watch(['src/scripts/vendor/*.js'], ['plugins']);
  gulp.watch(['src/scripts/*.js'], ['scripts', 'lint']);
});

gulp.task('default', ['styles', 'scripts', 'lint']);
