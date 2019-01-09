const gulp=require('gulp');
//걸프 의존성을 여기에 씁니다.
const babel=require('gulp-babel');
const eslint=require('gulp-eslint')

gulp.task('default', function(cb){
	//걸프 작업을 여기에 씁니다.
	//ESLint 실행
	gulp.src(["es6/**/*.js","public/ex6/**/*.js"])
	.pipe(eslint())
	.pipe(eslint.format());
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