var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var path = {
    js: 'js/*.js',
    css: 'css/*.css'
}
gulp.task('script', function(){
    gulp.src(path.js)
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function(){
    gulp.src(path.css)
        .pipe(minify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch-js', function(){
    gulp.watch(path.js, ['script']);
});

gulp.task('watch-css', function(){
    gulp.watch(path.css, ['css']);
});

gulp.task('pack', ['watch-js', 'watch-css', 'script', 'css']);

gulp.task('default', ['pack']);
