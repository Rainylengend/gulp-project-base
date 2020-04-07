const path = require('path')

// 应用端口
exports.port = 9091

// 应用根目录
exports.root = 'src'

// 打包目录
exports.output = 'dist'


exports.getFileName = (file) => {
    const ext = path.extname(file)
    const basename = path.basename(file)
    let dirname = path.dirname(file.split('src')[1])
    return [
        dirname,
        path.join(dirname, basename)
    ]
}