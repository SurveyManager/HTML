var gulp 					= require('gulp'),
		sass    			= require('gulp-sass'),
		browserSync 	= require('browser-sync'),
		concat      	= require('gulp-concat'),
  	uglify     		= require('gulp-uglifyjs'),
		autoprefixer 	= require('gulp-autoprefixer');// perfix

// Сжатие библиотек скриптов
gulp.task('scripts', function() {
    return gulp.src([ 														// Берем все необходимые библиотеки
			'libs/jquery/dist/jquery.min.js', 					// Берем jQuery
			'libs/bootstrap/dist/js/bootstrap.min.js' 	// Берем bootstrap
        ])
        .pipe(concat('libs.min.js')) 	// Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) 							// Сжимаем JS файл
        .pipe(gulp.dest('js')); 			// Выгружаем в папку app/js
});

gulp.task('sass', function(){
  return gulp.src('sass/**/*.sass')
    // .pipe(sass())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream:true}))
})

gulp.task('bsync',function() {
  browserSync({
    server:{baseDir: ''}
  })
})

gulp.task('watch',['bsync','sass','scripts'],function() {
  gulp.watch('sass/**/*.sass', ['sass'])
  gulp.watch(['*.html','css/*.css','js/*.js'], browserSync.reload)
})

gulp.task('default', ['watch'])
