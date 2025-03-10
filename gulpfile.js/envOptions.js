const srcPath = "./app";
const distPath = "./dist";
const nodePath = "./node_modules";

let envOptions = {
    string: "env",
    default: {
        env: "dev",
    },
    copyFile: {
        src: [`${srcPath}/**/*`, `!${srcPath}/assets/js/**/*.js`, `!${srcPath}/assets/scss/**/*.scss`, `!${srcPath}/assets/scss/**/*.sass`, `!${srcPath}/**/*.ejs`, `!${srcPath}/**/*.html`],
        path: distPath,
    },
    html: {
        src: [`${srcPath}/**/*.html`],
        ejsSrc: [`${srcPath}/**/*.ejs`],
        path: distPath,
    },
    scss: {
        src: [`${srcPath}/assets/scss/**/*.scss`, `${srcPath}/assets/scss/**/*.sass`],
        path: `${distPath}/assets/css`,
    },
    javascript: {
        src: [`${srcPath}/assets/js/**/*.js`],
        concat: "main.js",
        path: `${distPath}/assets/js`,
    },
    vendors: {
        src: [`${nodePath}/jquery/dist/**/jquery.min.js`],
        concat: "vendors.js",
        path: `${distPath}/assets/js`,
    },
    img: {
        src: [`${srcPath}/assets/images/**/*`],
    },
    fonts: {
        src: [`${srcPath}/assets/fonts/**/*`],
    },
    clean: {
        src: distPath,
    },
    browserDir: distPath,
    deploySrc: `${distPath}/**/*`,
};

exports.envOptions = envOptions;
