const {
    port,
    root,
    output,
    getFileName
} = require('./config/base')

const express = require('express')
const app = express()
const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const cleanCSS = require('gulp-clean-css')
const sourcemap = require('gulp-sourcemaps')
const MemoryFs = require('memory-fs')
const path = require('path')

const fs = new MemoryFs()


function log(text) {
    console.log(`-------------- ${text} ---------------`);
}

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, root, 'index.html')
    )
})

app.use((req, res, next) => {
    try {
        const data = fs.readFileSync(req.path);
        if (path.extname(req.path) === '.css') {
            res.type('css')
        } else {
            res.type('js')
        }
        res.send(data)
    } catch (e) {
        next()
    }
})

app.use(express.static(
    path.resolve(__dirname, root)
))


gulp.task('minify-css', cb => {
    // nested, expanded, compact, compressed
    gulp.src('src/**/*.scss')
        .pipe(
            sass({
                outputStyle: 'expanded'
            })
                .on('error', sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(gulp.dest(
            path.join(output)
        ))
        .on('end', () => {
            cb()
        })
});


gulp.task('uglify', cb => {
    log('uglify begin')
    gulp.src([
        'src/**/*.js',
        '!src/**/*.min.js',
    ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(output))
    cb()
});

gulp.task('connect', () => {
    app.listen(port, err => {
        if (err) {
            log(err);
            return
        }
        log(`服务器启动在: http://localhost:${port}`)
    })
})

gulp.task('output', (cb) => {
    log('output begin')
    rimraf('dist', function () {
        gulp.src([
            'src/**',
            '!src/**/*.scss',
            '!src/**/*.js',
            'src/**/*.min.js',
        ])
            .pipe(gulp.dest(output))
            .on('end', function () {
                log('output end')
                cb()
            })
    })
})


gulp.task('watch', (cb) => {
    gulp.watch('src/**/*.js', buildEs6)
    gulp.watch('src/**/*.scss', buildScss)
    cb()
})

// 打包
gulp.task('build', gulp.series('output', gulp.parallel('uglify', 'minify-css')));

// 开发
async function buildScss() {
    return new Promise(resolve => {
        // nested, expanded, compact, compressed
        gulp.src('src/**/*.scss')
            .pipe(
                sass({
                    outputStyle: 'expanded'
                })
                    .on('error', sass.logError)
            )
            .pipe(autoprefixer())
            .on('data', data => {
                const [dirname, filename] = getFileName(data.history.slice(-1)[0])
                try {
                    fs.readdirSync(dirname)
                } catch (e) {
                    fs.mkdirpSync(dirname)
                }
                fs.writeFileSync(
                    filename,
                    data._contents
                )
                resolve(true)
            }).on('end', () => {
            resolve(true)
        })
    })
}

async function buildEs6() {
    return new Promise(resolve => {
        gulp.src([
            'src/**/*.js',
            '!src/**/*.min.js',
        ])
            .pipe(sourcemap.init())
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(sourcemap.write('.'))
            .on('data', data => {
                const [dirname, filename] = getFileName(data.history.slice(-1)[0])
                try {
                    fs.readdirSync(dirname)
                } catch (e) {
                    fs.mkdirpSync(dirname)
                }
                fs.writeFileSync(
                    filename,
                    data._contents
                )
            }).on('end', () => {
            resolve(true)
        })
    })
}

async function build() {
    await Promise.all([buildEs6(), buildScss()])
}


gulp.task(
    'default',
    gulp.series(
        build,
        gulp.parallel('watch', 'connect')
    )
)