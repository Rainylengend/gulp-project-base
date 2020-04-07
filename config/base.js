const path = require('path')
const config = {
    // 应用端口
    port: 9091,

    // 应用根目录
    root: 'src',

    // 打包目录
    output: 'dist',
    getFileName(file) {
        const basename = path.basename(file)
        let dirname = transformSep(path.dirname(file.split(config.root)[1]))
        return [
            dirname,
            transformSep(
                path.join(dirname, basename)
            )
        ]
    }
}


function transformSep(file) {
    const sep = path.sep
    return file.split(sep).join('/')
}

module.exports = config