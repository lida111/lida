const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const webserver = require("gulp-webserver");
const babel = require("gulp-babel");
const del = require("del");
const {
    watch
} = require("gulp");
const sass = require("gulp-sass");


const sassHandler = () => {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest("./dest/css"));
}

const cssHandler = () => {
    return gulp.src("./src/css/*.css")
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest("./dest/css"));
}

const jsHandler = () => {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dest/js"));
}

const htmlHandler = () => {
    return gulp.src(["./src/pages/*.html", "./src/pages/*.htm"])
        .pipe(htmlmin({
            "removeAttributeQuotes": true,
            "removeComments": true,
            "collapseBooleanAttributes": true,
            "collapseWhitespace": true,
            "minifyCSS": true,
            "minifyJS": true
        }))
        .pipe(gulp.dest("./dest/pages"));
}

const imgHandler = () => {
    return gulp.src("./src/images/**")
        .pipe(gulp.dest("./dest/images"));
}

const libHandler = () => {
    return gulp.src("./src/lib/**")
        .pipe(gulp.dest("./dest/lib"));
}

const fontHandler = () => {
    return gulp.src("./src/font/**")
        .pipe(gulp.dest("./dest/font"));
}
const delHandler = () => {
    return del(["./dest"]);
}

const watchHandler = () => {
    gulp.watch("./src/css/*.css", cssHandler);
    gulp.watch("./src/js/*.js", jsHandler);
    gulp.watch("./src/images/**", imgHandler);
    gulp.watch("./src/lib/**", libHandler);
    gulp.watch("./src/pages/*.html", htmlHandler);
    gulp.watch("./src/sass/*.scss", sassHandler);
    gulp.watch("./src/font/**", fontHandler);
}

const serverHandler = () => {
    return gulp.src("./dest")
        .pipe(webserver({
            port: "80",
            open: "./pages/index.html",
            livereload: true,
            proxies: [{
                source: "/weather",
                target: 'https://way.jd.com/jisuapi/weather'
            }]
        }))
}
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, jsHandler, imgHandler, htmlHandler, libHandler, sassHandler, fontHandler),
    serverHandler,
    watchHandler
)