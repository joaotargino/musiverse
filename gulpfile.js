// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var server = require('gulp-express');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var wiredep = require('wiredep')
  .stream;
var merge = require('merge2');

var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = tsc.createProject('tsconfig.json');

var paths = {
  scripts: 'app/**/*.js',
  styles: ['./app/**/*.css', './app/**/*.scss'],
  index: './app/index.html',
  partials: ['app/**/*.html', '!app/index.html'],
  dist: './dist',
  typescripts: './app/src/*.ts'
};


gulp.task('ts-lint', function() {
  return gulp.src(paths.typescripts)
    .pipe(tslint())
    .pipe(tslint.report('prose'));
});

gulp.task('compile-ts', function() {
  var sourceTsFiles = [paths.typescripts, //path to typescript files
    './typings/browser.d.ts',
    './typings/browser/**/*.d.ts'
  ]; //reference to library .d.ts files

  var tsResult = gulp.src(sourceTsFiles)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  tsResult.dts.pipe(gulp.dest(paths.dist + '/js'));
  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + '/js'));
});


// tasks
gulp.task('clean', function() {
  gulp.src('./dist/*')
    .pipe(clean({
      force: true
    }));
});
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', ['lint'], function() {
  // Watch our scripts
  gulp.watch(['./app/**/*.html', './app/*.css', './app/**/*.js', '!./app/bower_components/**'], [
    'copy-html-files'
  ]);

  gulp.watch('./app/src/**/*.ts', ['ts-compile']);

});

gulp.task('minify-css', function() {
  var opts = {
    comments: true,
    spare: true
  };
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest(paths.dist))
});

var tsProject = tsc.createProject({
  declaration: true,
  noExternalResolve: true
});

gulp.task('ts-compile', function() {
  var tsResult = gulp.src('./app/src/**/*.ts')
    .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
    tsResult.dts.pipe(gulp.dest('./dist/js/definitions')),
    tsResult.js.pipe(gulp.dest('./dist/js'))
  ]);
});


gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest(paths.dist))
});


gulp.task('copy-bower-components', function() {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function() {
  gulp.src(['./app/**/*.html', '!./app/index.html'])
    .pipe(gulp.dest(paths.dist));

  var injectStyles = gulp.src([
    './app/*.css'
  ], {
    read: false
  });

  var injectScripts = gulp.src([
      './app/javascript/**/*.js'
      // '!' + paths.src + '/**/*.test.js'
    ])
    .pipe(angularFilesort());
  // tell wiredep where your bower_components are

  var injectOptions = {
    relative: true
  };

  var wiredepOptions = {
    directory: './app/bower_components/'
  };

  return gulp.src('./app/index.html')
    .pipe(inject(injectStyles, injectOptions))
    .pipe(inject(injectScripts, injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('connect', function() {
  server.run(['musiverse.js']);
  gulp.run('watch')
});

gulp.task('connectDist', function() {
  connect.server({
    root: paths.dist,
    port: 9999
  });
});


gulp.task('browserify', function() {
  // Grabs the app.js file
  return browserify('./app/javascript/app.js', {
      insertGlobals: true,
      debug: false
    })
    // bundles it and creates a file called main.js
    .bundle()
    .pipe(source('main.js'))
    // saves it the public/js/ directory
    .pipe(gulp.dest('./dist/js/'));
})


// default task
gulp.task('default', ['lint', 'connect']);
gulp.task('dev', function() {
  runSequence(
    ['clean'], ['lint', 'minify-css', 'minify-js', 'copy-bower-components', 'copy-html-files', 'connect']
  );
});
gulp.task('build', function() {
  runSequence(
    ['clean'], ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist']
  );
});
