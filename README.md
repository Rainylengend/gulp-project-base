# gulp自动化构建工程，适用于绝大多数多页面项目

### 关于编译文件
开发环境，编译参数的js、css文件会放到内存当中方便读取

### 关于scss编译
该项目默认会编译src下面所有的scss文件，并输出到当前位置；**特别注意**：如果你在`resouces/css`目录下面建了一个index.scss文件，那么正确的引入路径如下所示

```html
<link rel="stylesheet" href="resources/css/index.css">
```

### 关于babel
该项目默认会编译src下面除了.min.js后缀的所有js文件，并输出到当前位置

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
            |-- css // scss编译放置的目录
            |   |-- index.css
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
