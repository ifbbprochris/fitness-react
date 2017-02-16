'use strict';
var gulp = require('gulp'),
    rimraf = require('rimraf'),
    uglify=require('gulp-uglify'),
    gulpWebpack = require('gulp-webpack');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var fs=require('fs'),
    path=require('path');
var webpackConfig=require('./webpack.config');
function n(str){
    var PREFIX='dev-';
    return PREFIX+str;
}
gulp.task(n('clean'),function(cb){
    rimraf('dist', cb);
});
gulp.task(n('resource'),[n('clean')],function(){
    return gulp.src(['src/resource/**/*'])
        .pipe(gulp.dest('dist/app/front/resource'));
});
gulp.task(n('html'),[n('resource')],function(){
    return gulp.src(['src/app/front/index.html'])
        .pipe(gulp.dest('dist/app/front'));
});
gulp.task(n('dev-js'),[n('html')],function(){
    return gulp.src('src/app/front/index.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulp.dest('dist/app/front'))
});
gulp.task(n('rel-js'),[n('html')],function(){
    return gulp.src('src/app/front/index.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/app/front'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev'));
});
gulp.task('dev',[n('dev-js')],function(){
});
gulp.task('rel',[n('rel-js')],function(){
    return gulp.src(['./rev/*.json', './dist/app/front/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./dist/app/front/'));
});
gulp.task('default', ['dev'], function(){});

