
const { src, dest, watch, parallel } = require("gulp")

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');


// IMAGES
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done){
    
    src('src/scss/**/*.scss')// identificar el archivo SASS
    .pipe(plumber()) // manejo de errores
    .pipe(sass())  // compilarlo
    .pipe(dest('../backend/public/css'));// Almacenarla en el disco duro
   
  
    done(); // Callback que abisa a gulp cuando llegamos al final
}

function webpVersion(done){

    const options = {
        quality: 50,
    };

    src("src/img/**/*.{png, jpg}")
    .pipe(webp(options))
    .pipe(dest("../backend/public/css"))
    done()
}

function avifVersion(done){

    const options = {
        quality: 50,
    };

    src("src/img/**/*.{png, JPG, jpg}")
    .pipe(avif(options))
    .pipe(dest("../backend/public/css"))
    done()
}


function dev(done){
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = parallel(dev); // webpVersion, avifVersion,