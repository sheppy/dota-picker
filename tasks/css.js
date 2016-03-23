import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import autoprefixer from "autoprefixer";
import config from "./config";

const plugins = gulpLoadPlugins();
const postCss = gulpLoadPlugins({
    pattern: ["postcss-*", "postcss.*"],
    replaceString: /^postcss(-|\.)/
});

gulp.task("css", function () {
    let cssProcessors = [
        postCss.normalize(),
        postCss.partialImport({
            extension: "scss"
        }),
        postCss.nested(),
        postCss.discardComments(),
        postCss.simpleVars(),
        autoprefixer({ browsers: ["last 1 version"] }),
        postCss.reporter({
            clearMessages: true
        })
    ];

    return gulp
        .src([
            path.join(config.dir.src, config.dir.scss, config.glob.scss),
            "!" + config.glob.scssPartial
        ])
        .pipe(plugins.plumber())
        .pipe(plugins.postcss(cssProcessors, { syntax: postCss.scss }))
        .pipe(plugins.rename({
            extname: ".css"
        }))
        .pipe(gulp.dest(path.join(config.dir.dist, config.dir.css)));
});
