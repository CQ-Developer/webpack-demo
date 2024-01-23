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