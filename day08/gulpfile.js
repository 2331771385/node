// 引入gulp模块
var gulp = require('gulp');
// 引入合并文件的模块
var concat = require('gulp-concat');
// 引入重命名的模块
var rename = require('gulp-rename');

// 用于压缩HTML页面的模块
var htmlMin = require('gulp-htmlmin');

// 用于压缩js文件的模块
var uglify = require('gulp-uglify');

// 用于压缩css文件的模块
var cssNano = require('gulp-cssnano');

// 定义压缩js页面的任务
// 第一个参数是任务的名称
// 第二个参数依赖的任务名，可选的，如果写上就代表这个任务的执行需要等待上一个任务的完成
// 第三个参数是一个函数
gulp.task('js', function () {
    // gulp.src()：目标源路径，查找的是src文件夹下js文件下所有的js文件
    // pipe()管道可以执行任务
    return gulp.src(['src/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

// 用于安装css页面的任务
gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(cssNano())
        .pipe(gulp.dest('dist/css'))
})

// 用于压缩HTML页面的任务
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'))
})


// 定义默认的任务，每一个gulp都有一个默认模块
// 第二个参数是执行的任务列表
gulp.task('default', gulp.series(['js', 'css', 'html']));