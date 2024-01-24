# webpack-demo

demo for webpack

## 安装

```shell
npm i webpack webpack-cli --save-dev
```

## 开发打包

```shell
npx webpack ./src/index.js --mode=development
```

## 生产环境打包

```shell
npx webpack ./src/index.js --mode=production
```

## 核心概念

- `entry(入口)`：指示*webpack*从哪个文件开始打包

- `output(输出)`：指示*webpack*打包完的文件输出到哪里已经如何命名等

- `loader(加载器)`: *webpack*本身只能处理JS和JSON资源，其他资源需要使用loader才能加载

- `plugins(插件)`：扩展*webpack*的功能

- `mode(模式)`
    - 开发模式：development
    - 生产模式：production

## webpack配置文件

> 名称必须为*webpack.config.js*

## 开发模式的意义

1. 将代码进行编译

2. 代码规范检查

## 处理CSS样式资源

> 安装*css-loader*和*style-loader*

```shell
npm i css-loader style-loader --save-dev
```

> 在entry中引入

```javascript
import "./css/index.css";
```

> 配置webpack.config.js

```javascript
module: {
    rules: {
        {
            // 正则表达式判断哪些文件需要处理
            test: /\.css$/,
            // 使用哪些loader来处理该资源
            // 顺序从右到左
            // style-loader将JS中的css通过创建script标签的方式添加到html文件中
            // css-loader将css资源编译成commonJS模块
            use: ["style-loader", "css-loader"]
        }
    }
}
```

## 处理LESS样式资源

> 安装*less*和*less-loader*

```shell
npm i less less-loader --save-dev
```

> 在entry中引入less资源

```javascript
import "./less/index.less";
```

> 在*webpack.config.js*中配置less-loader

```javascript
module: {
    rules: {
        {
            test: /\.css$/,
            // less-loader将.less资源编译成css资源
            use: ["style-loader", "css-loader", "less-loader"]
        }
    }
}
```

## 处理SASS样式资源

> 安装*sass*和*sass-loader*

```shell
npm install sass sass-loader --save-dev
```

> 在entry中引入sass资源

```javascript
import "./sass/index.sass";
import "./sass/index.scss";
```

> 在*webpack.config.js*中配置sass-loader

```javascript
module: {
    rules: {
        {
            test: /\.s[ac]ss$/,
            // sass-loader将.sass/.scss资源编译成css资源
            use: ["style-loader", "css-loader", "sass-loader"]
        }
    }
}
```

## 处理stylus资源

> 安装*stylus*和*stylus-loader*

```shell
npm install stylus stylus-loader --save-dev
```

> 在entry中引入stylus资源

```javascript
import "./stylus/index.styl";
```

> 在*webpack.config.js*中配置stylus-loader

```javascript
module: {
    rules: {
        {
            test: /\.styl$/,
            // stylus-loader将.styl资源编译成css资源
            use: ["style-loader", "css-loader", "sass-loader"]
        }
    }
}
```

## 处理图片资源

默认就可以打包图片资源。

> 在*webpack.config.js*中配置优化图片资源

```javascript
module: {
    rules: [
        {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    // 小于该体积(10kb)的图片转base64
                    maxSize: 10 * 1024
                }
            },
            // 指定图片的输出目录和文件名
            // [hash:10]表示文件的hash值，10表示只取hash值的前10位
            // [ext]文件的扩展名
            // [query]请求的路径查询参数
            generator: {
                filename: "static/images/[hash:10][ext][query]"
            }
        }
    ]
}
```

## 处理字体图标文件

默认就可以打包字体图标资源

> 在*webpack.config.js*中配置字体图标的输出目录

```javascript
module: {
    rules: [
        {
            test: /\.(ttf|woff2?)$/,
            // 指定资源类型
            type: "asset/resource",
            generator: {
                filename: "static/fonts/[hash:10][ext][query]"
            }
        }
    ]
}
```

## 处理其他资源

> 在*webpack.config.js*中配置其他资源输出目录

```javascript
module: {
    rules: [
        {
            // 这里以视频文件为例、也可以是excel文件、音乐文件等等
            test: /\.(mp4|webm)$/,
            // 指定资源类型
            type: "asset/resource",
            generator: {
                filename: "static/media/[hash:10][ext][query]"
            }
        }
    ]
}
```

## 处理JS资源

### 代码检查-eslint

[eslint](https://eslint.org/)是一个js和jsx的代码检查工具

> 可使用的配置文件名称

- .eslintrc

- .eslintrc.js

- .eslintrc.json

- 也可以在package.json中添加eslintConfig属性

> 安装*eslint*和*eslint-webpack-plugin*插件

```shell
npm install eslint eslint-webpack-plugin --save-dev
```

> 在*webpack.config.js*中引入插件并进行配置

```javascript
// 引入eslint插件
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
    plugins: [
        new ESLintPlugin({
            // 指定被需要检查的目录
            context: path.resolve(__dirname, "src")
        })
    ]
};
```

> 在项目根目录添加*eslintrc.js*配置文件

```javascript
module.exports = {
    extends: [
        // 继承 ESLint 的官方规则
        "eslint:recommended"
    ],
    env: {
        // 启用node全局变量
        node: true,
        // 启用浏览器全局变量
        browser: true
    },
    parserOptions: {
        // 指定使用ES语法版本
        ecmaVersion: 6,
        // 指定使用ES模块化
        sourceType: "module"
    },
    rules: {
        // 禁用var申明变量
        "no-var": 2
    }
};
```

### 兼容性-babel

[Babel](https://babeljs.io/)是一个`JavaScript`编译器，主要功能是将`ECMAScript 2015+`的代码转换成向后兼容的版本，让代码适配一些老环境。

> 安装*babel-loader*
```shell
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

> 在*webpack.config.js*文件中进行配置

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.js&/,
                // 排除node_modules目录下的JS文件
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 下面这些配置可以在babel的配置文件中进行独立配置
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    }
};
```

> 在根目录的*babel.config.json*进行配置

```json
{
    "presets": [
        [
            "@babel/preset-env"
        ]
    ]
}
```

## 处理HTML资源

> 安装*html-webpack-plugin*插件

```shell
npm install html-webpack-plugin --save-dev
```

> 在*webpack.config.js*中进行配置

```javascript
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 配置插件
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            // 会自动引入打包生成的资源
            template: path.resolve(__dirname, "src/html/index.html")
        })
    ]
};
```
