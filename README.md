# gulp自动化构建工程，适用于绝大多数多页面项目

### 目录结构

```

|-- Desktop
    |-- .gitignore
    |-- README.md
    |-- gulpfile.js // gulp配置文件
    |-- package.json
    |-- server.js
    |-- yarn.lock
    |-- config
    |   |-- base.js //目录的配置
    |-- dist //打包后的目录结构
    |   |-- index.html
    |   |-- resources
    |       |-- css
    |       |   |-- index.css
    |       |-- js
    |           |-- index.js
    |-- src // 开发目录
        |-- index.html
        |-- resources
            |-- css
            |   |-- index.css
            |-- es6 // es6书写目录
            |   |-- index.js
            |-- js // es6转js的目录
            |   |-- index.js
            |   |-- index.js.map
            |-- scss // 写scss的目录
                |-- index.scss


```

### 命令

```
// 安装依赖
yarn 

// 启动开发环境
yarn start 

// 打包
yarn build

```
