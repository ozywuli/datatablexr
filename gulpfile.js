const path = require('path')

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const streamify = require('gulp-streamify');
const watchify = require('watchify');
const buffer = require('vinyl-buffer');
const rimraf = require('rimraf');
const browsersync = require('browser-sync').create();
const notifier = require('node-notifier');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')

var bundler;

function showError(arg) {
    notifier.notify({
        title: 'Error',
        message: '' + arg,
        sound: 'Basso'
    })
    console.log(arg)
    this.emit('end');
}

//================================================================================
// BrowserSync
//================================================================================
function serve(done) {
    browsersync.init({
        open: false,
        notify: false,
        port: 9000,
        server: {
            baseDir: [path.join('examples', 'pages'), path.join('examples', 'assets'), 'dist'],
            directory: true
        }
    })

    done();
}


//================================================================================
// Clean
//================================================================================

gulp.task('clean', (cb) => {
    rimraf('./dist', cb)
})

gulp.task('build:scss', () => {
    return gulp.src(path.join('examples', 'assets', 'styles.scss'))
    .pipe(sass({
        outputStyle: 'nested',
        precision: 10,
        onError: showError
    }).on('error', function(error) {
        showError(error);
        this.emit('end');
    }))
    .pipe(postcss([
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', 'Explorer >= 9', 'Android >= 4.0', '> 2%']
        })
    ]))
    .pipe(gulp.dest(path.join('examples', 'assets')))
    .pipe(browsersync.stream({match: '**/*.css'}))
})

function buildApp () {
    bundler = bundler || watchify(browserify({
        entries: ['src/DataTableX.jsx'],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    })).transform(babelify, {presets: ['env', 'react']})

    return bundler
        .bundle()
        .on('error', showError)
        .pipe(source('DataTableX.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.stream({match: path.join('**','*.js')}))
}   

gulp.task('build:js', buildApp);

gulp.task('build', gulp.series('clean', 'build:js', 'build:scss'), () => {
    
})

function watch(done) {
    gulp.watch('src/*.jsx', gulp.parallel('build:js'));
    gulp.watch(path.join('examples', 'assets', '*.scss'), gulp.parallel('build:scss'))
    gulp.watch(path.join('examples', 'pages', '*.html'), browsersync.reload)

    done();
}


gulp.task('default', gulp.series('clean', watch, serve))