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
                test: /\.js$/,
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

## 开发服务器与自动化

> 安装*webpack-dev-server*

```shell
npm install webpack-dev-server --save-dev
```

> 在*webpack.config.js*中进行配置

```javascript
// 可以在package.json中配置script让项目自动启动
module.exports ={
    // 开发服务器不会输出资源
    devServer: {
        host: "localhost",
        port: 3000,
        static: "./dist"
        // 自动打开浏览器
        open: true,
    }
};
```

> 启动开发服务器

```shell
npx webpack server
```

## 开发模式和生产模式

```shell
# 开发模式
npx webpack server --config ./config/webpack.dev.js
# 生产模式
npx webpack --config ./config/webpack.prod.js
```

> 在*package.json*中添加`scripts`

```json
{
    "scripts": {
        "start": "webpack server --config ./config/webpack.dev.js",
        "build": "webpack --config ./config/webpack.prod.js"
    }
}
```

> 运行

```shell
# 开发
npm start
# 生产
npm run build
```

## 生产环境单独处理CSS

目的：不要将css打包到js中，而是打包到独立的css文件中并通过link标签引入

> 安装*mini-css-extract-plugin*插件

```shell
npm install mini-css-extract-plugin --save-dev
```

> 在*webpack.prod.js*中进行配置

```javascript
// 引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // 使用插件
    plugins: {
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        })
    },
    // 修改loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    }
};
```
## CSS兼容性

> 安装*postcss*

```shell
npm install postcss postcss-loader postcss-preset-env --save-dev
```

> 在*webpack.prod.js*中进行配置

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env"
                                    ]
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
};
```

> 在*package.json*中添加配置项[browserslist](https://github.com/browserslist/browserslist#queries)属性

```json
{
    "browserslist": [
        "last 2 version",
        "> 1%",
        "not dead"
    ]
}
```

## CSS压缩

> 安装*css-minimizer-webpack-plugin*插件

```shell
npm install css-minimizer-webpack-plugin --save-dev
```

> 在*webpack.prod.js*中配置插件

```javascript
// 引入插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 配置插件
module.exports = {
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
};
```

## source maps

源代码映射，方便找到源代码出错位置，查看[可选配置项](https://webpack.js.org/configuration/devtool/#devtool)

> 在*webpack.prod.js*进行配置

```javascript
module.exports = {
    devtool: "source-map"
};
```

> 在*webpack.dev.js*进行配置

```javascript
module.exports = {
    devtool: "eval-source-map"
};
```

## 提升开发模式的打包构建速度

`Hot Moudle Replacement - HMR` 在程序运行中替换某个模块而不需要重新加载所有模块, `webpack 5` 默认开启了此功能，此功能**不推荐**在生产环境中使用

> 在*webpack.dev.js*的*devServer*属性中开启此功能

```javascript
module.exports = {
    devServer: {
        // 注意该功能在 webpack 5 中默认就启动了，这里只是进行说明
        hot: true
    }
};
```

> 在*index.js*中配置需要热替换的JS资源

```javascript
// 注意HMR原本不支持JS资源的热替换，所以针对JS资源需要单独处理
if (module.hot) {
    module.hot.accept("./js/count.js");
    module.hot.accept("./js/sum.js");
}
```

## 使用oneOf让每中资源制备一个rule处理

默认情况下，每种资源都会尝试*module.rules*中的所有rule，通过oneOf可以提升效率，让资源仅执行一个rule就退出

> 在*webpack.config.js*中添加*oneOf*

```javascript
module.exports = {
    module: {
        rules: [
            {
                // 添加oneOf配置
                oneOf: [
                    {
                        test: /\.(?:js|mjs|cjs)$/,
                        exclude: /node_modules/,
                        use: ["babel-loader"]
                    }
                ]
            }
        ]
    }
};
```

## 排除不需要处理的资源

- includ: 只处理包含的资源

- exclude: 排除不需要处理的资源

> 在*webpack.config.js*中排除不需要处理的资源

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                // 排除node_modules中的资源
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, "../src"),
            // 排除node_modules中的资源
            // 这是默认值可以不写，这里只是进行说明
            exclude: "node_modules"
        })
    ]
};
```

## 开启babel-loaderd缓存提高打包性能

> 在*webpack.config.js*中进行配置

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 开启缓存
                        cacheDirectory: true,
                        // 关闭缓存压缩，该选项可以不进行设置
                        cacheCompression: false
                    }
                }
            }
        ]
    }
};
```

## 开启eslint缓存提高打包性能

> 在*webpack.config.js*中进行配置

```javascript
module.exports = {
    plugins: [
        new ESLintPlugin({
            // 该选项默认启用, 不需要额外配置, 这里仅作展示
            cache: true
        })
    ]
};
```

## 启用多进程提升打包性能

> 安装*thread-loader*

```shell
npm install thread-loader --save-dev
```

> 在*babel-loader*前添加*thread-loader*

```javascript
module.exports = {
    module: {
        rules: [
            oneOf: [
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "thread-loader",
                            options: {
                                // 配置线程数量，默认是CPU核数减1
                                workers: 2
                            }
                        },
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: true,
                                cacheCompression: false
                            }
                        }
                    ]
                }
            ]
        ]
    }
};
```

> 在*webpack.config.js*中配置*ESLintPlugin*多线程

```javascript
module.exports = {
    plugins: [
        new ESLintPlugin({
            // 可以配置为true使其自动决定线程数量或给定具体数量
            threads: 2
        })
    ]
};
```

> 安装*terser-webpack-plugin*插件

```shell
npm install terser-webpack-plugin --save-dev
```

> 在*webpack.config.js*中进行配置

```javascript
// 引入插件
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            // 配置插件
            new TerserPlugin({
                // 开启多进程处理，默认并发数 os.cput().length - 1
                // 也可以传入数字进行指定
                parallel: true
            })
        ]
    }
};
```

## 减少代码体积

### [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

`webpack 5`生产模式下已经默认开启，无序进行额外配置

### [Babel](https://webpack.js.org/loaders/babel-loader/#babel-is-injecting-helpers-into-each-file-and-bloating-my-code)

默认情况下，`babel`会为文件插入一些代码，是体积较大，速度过慢，可以通过如下配置进行优化：

> 安装@babel/plugin-transform-runtime插件

```shell
npm install @babel/plugin-transform-runtime --save-dev
```

> 在*babel-loader*中添加插件

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // 引入插件
                            plugins: ["@babel/plugin-transform-runtime"]
                        }
                    }
                ]
            }
        ]
    }
};
```

> 也可以在*babel.config.json*中进行配置

```json
{
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```

## 压缩图片

> 安装[image-minimizer-webpack-plugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/)插件

```shell
# 安装核心插件
npm install image-minimizer-webpack-plugin imagemin --save-dev
# 下载无损压缩组件
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
# 下载有损压缩组件
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```

> 在*webpack.config.js*中进行配置

```javascript
// 引入插件
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// 配置插件
module.exports = {
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            "imagemin-gifsicle",
                            "imagemin-mozjpeg",
                            "imagemin-pngquant",
                            "imagemin-svgo"
                        ]
                    }
                }
            })
        ]
    }
};
```