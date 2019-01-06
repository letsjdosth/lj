const gulp=require('gulp');
//걸프 의존성을 여기에 씁니다.
const babel=require('gulp-babel');

gulp.task('default', function(cb){
	//걸프 작업을 여기에 씁니다.
	//노드 소스
    gulp.src("es6/**/*.js")
    .pipe(babel({"presets":["@babel/preset-env"]}))
    .pipe(gulp.dest("dist"));
	//브라우저 소스
    gulp.src("public/es6/**/*.js")
    .pipe(babel({"presets":["@babel/preset-env"]}))
    .pipe(gulp.dest("public/dist"));
    cb();
});