var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

var path = {
    js: 'js/*.js',
    css: 'css/*.css',
    img: 'img/*.*'
}
gulp.task('script', () => {
    gulp.src(path.js)
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', () => {
    gulp.src(path.css)
        .pipe(minify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('img', () => {
    gulp.src(path.img)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', () => {
    gulp.watch([path.js, path.css, path.img], ['script', 'css', 'img'])
});

gulp.task('pack', ['script', 'css', 'img', 'watch']);

gulp.task('default', ['pack']);
