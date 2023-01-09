import gulp from 'gulp';
import gulppost from "gulp-postcss";
import cssnano from "cssnano";
import terser from "gulp-terser";
import browserSync, { watch } from "browser-sync";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";

const sass = gulpSass(nodeSass);

const browser_Sync = browserSync.create();

// sass task 
gulp.task("sass", done=>{
    gulp.src("app/scss/**/*.scss",{sourcemaps:true})
    .pipe(sass().on("error",sass.logError))
    .pipe(gulppost([cssnano()]))
    .pipe(gulp.dest("dist/css",{sourcemaps: '.'}));

    done();
})

// function sassTask(){
//     return src("app/scss/**/*.scss", { sourcemaps: true })
//       .pipe(sass().on("error", sass.logError))
//       .pipe(gulppost([cssnano()]))
//       .pipe(dest("dist/css", { sourcemaps: "." }));
// }

// Js

gulp.task("js", done=>{
    gulp.src("app/js/**/*.js",{sourcemaps:true})
    .pipe(terser())
    .pipe(gulp.dest("dist/js",{sourcemaps: '.'}))
     done();  
})

// function jsTask(){
//     return src("app/js/**/*.js", { sourcemaps: true })
//      .pipe(terser())
//      .pipe(gulp.dest("dist/js", { sourcemaps: "." }));
// }


// BrowserSync

gulp.task("browser-sync", done=>{
  browser_Sync.init({
    server:{
        baseDir: ".",
 
   }})
  done(); 
})
// function browserSyncTask(done){
//     browserSync.init({
//         server: {
//             baseDir: "."
//         },
//     });
//     done();
// }
// Reload browser
gulp.task("reload", done=>{
  browser_Sync.reload();
   done() 
})

// function reload(done){
//     browser_Sync.reload();
//     done()
// }

// watch
gulp.task("watch",done=>{
    gulp.watch("*.html",gulp.series("reload"));
    gulp.watch("app/scss/**/*.scss", gulp.series("sass", "reload"));
    gulp.watch("app/js/**/*.js", gulp.series("js", "reload"));
    done();
});
// function watchs(){
//     watch("*.html",[reload])
//     watch(["app/scss/**/*.scss", "app/js/**/*.js"],series(sassTask,jsTask,reload));
// }
// default

gulp.task("default",
    gulp.series("sass","js","browser-sync","watch"));


// exports.default=series(
//     sassTask,
//     jsTask,
//     browserSyncTask,
//     watchs
// )