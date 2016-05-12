var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gUtil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin')
var shell = require('gulp-shell');
var watchPath = require('gulp-watch-path');
var combiner = require('stream-combiner2');

var filePath = {
    js: './js/**/*.js',
    scss: './sass/**/*.scss',
    img: './images/**/*.*',
    font: './fonts/**/*'
}

//测试颜色输出
gulp.task('gutil',function(){
    console.log('message');
    console.log(gUtil.colors.green('message:'),'some');
});
//error输出
var handleError = function(err){
    var colors = gUtil.colors;
    console.log('\n');
    gUtil.log(colors.red('Error message!'));
    gUtil.log('fileName: ', colors.red(err.fileName));
    gUtil.log('lineNumber: ', colors.red(err.lineNumber));
    gUtil.log('message:', err.message);
    gUtil.log('plugin', colors.yellow(err.plugin));
}

gulp.task('uglify', function(){
    gulp.src(filePath.js)
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scss', function(){
    return sass(filePath.scss)
        .on('error', handleError)
        .pipe(gulp.dest('dist/css'));
});
gulp.task('image', function(){
    gulp.src(filePath.img)
         .pipe(imagemin({
             progressive: true
         }))
         .pipe(gulp.dest('dist/images'));
 });

gulp.task('copy', function(){
    gulp.src(filePath.font)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watchjs', function(){
    gulp.watch(filePath.js, function(event){
        var paths = watchPath(event, 'js/', 'dist/');

        //报错后停止gulp
        // gulp.src(paths.srcPath)
        //     .pipe(uglify())
        //     .pipe(gulp.dest(paths.distDir));

        //输出错误日志不停止gulp
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            uglify(),
            gulp.dest(paths.distDir)
        ]);

        //输出日志
        console.log(gUtil.colors.green(event.type), paths.srcPath);
        console.log(gUtil.colors.green('Dist:'), paths.distPath);
        combined.on('error', handleError)

    });
});

gulp.task('watchscss', function(){
    gulp.watch(filePath.scss, ['scss']);
});

gulp.task('watchimage', function(){
    gulp.watch(filePath.img, function(event){
        var paths = watchPath(event, 'images/', 'dist/');
        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir));

            //输出日志
            console.log(gUtil.colors.green(event.type), paths.srcPath);
            console.log(gUtil.colors.green('Dist:'), paths.distPath);
    });
});

gulp.task('watchcopy', function(){
    gulp.watch(filePath.font, function(event){
        var paths = watchPath(event);

        gulp.src(paths.srcPath)
            .pipe(gulp.dest(paths.distDir));

        console.log(gUtil.colors.green(event.type), paths.srcPath);
        console.log(gUtil.colors.green('Dist:'), paths.distPath);
    })
});

gulp.task('express', shell.task(['supervisor ../bin/www']))
gulp.task('start', ['uglify', 'scss', 'image', 'copy']);
gulp.task('watch', ['watchjs', 'watchscss', 'watchimage', 'watchcopy']);

gulp.task('default', ['start', 'watch']);
