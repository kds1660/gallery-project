var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyJs = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    less = require('gulp-less'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require("gulp-rename"),
    notify = require("gulp-notify"),
    clean = require('gulp-clean');

gulp.task('vendors-css', function () {
    gulp.src([
        'vendor/bower_components/bootstrap/dist/css/bootstrap.css',
        'vendor/bower_components/font-awesome/css/font-awesome.css'
    ])
        .pipe(concat('vendors-css.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('web/css/'));
});

gulp.task('custom-css', function() {
    gulp.src(['src/GalleryBundle/Resources/FrontApp/src/css/app.css'])
        .pipe(less({compress: true}))
        .pipe(uglifycss())
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('web/css/'))
        .pipe(notify("Gulp watch: custom-css task completed."));
});

gulp.task('vendors-js', function() {
    gulp.src([
        'vendor/bower_components/jquery/dist/jquery.js',
        'vendor/bower_components/angular/angular.js',
        'vendor/bower_components/angular-ui-router/release/angular-ui-router.js',
        'vendor/bower_components/angular-bootstrap/ui-bootstrap.js',
        'vendor/bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    ])
        .pipe(concat('vendors-js.min.js'))
        .pipe(minifyJs())
        .pipe(gulp.dest('web/js/'));
});

gulp.task('angular-app-js', function() {
    gulp.src(['src/GalleryBundle/Resources/FrontApp/src/js/*.js',
        'src/GalleryBundle/Resources/FrontApp/src/js/Controllers/*.js',
        'src/GalleryBundle/Resources/FrontApp/src/js/Directives/*.js',
        'src/GalleryBundle/Resources/FrontApp/src/js/Services/*.js'])
        .pipe(concat('angular-app.min.js'))
       /* .pipe(ngAnnotate())
        .pipe(minifyJs())*/
        .pipe(gulp.dest('web/js/'))
        .pipe(notify("Gulp watch: angular-app-js task completed."));
});

gulp.task('clean', function () {
    return gulp.src(['web/css/*', 'web/js/*'])
        .pipe(clean());
});

gulp.task('default', ['clean'], function () {
    var tasks = ['vendors-css', 'custom-css', 'vendors-js', 'angular-app-js'];

    tasks.forEach(function (val) {
        gulp.start(val);
    });
});

gulp.task('watch', function () {
    var css = gulp.watch('src/GalleryBundle/Resources/FrontApp/src/css/*.css', ['custom-css']),
        js = gulp.watch('src/GalleryBundle/Resources/FrontApp/src/js/**/*.js', ['angular-app-js']);
});
