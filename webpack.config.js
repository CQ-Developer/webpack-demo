const path = require("node:path");

module.exports = {
    // entry
    // 绝对路径
    entry: "./src/index.js",

    // output
    output: {
        // 绝对路径
        path: path.resolve(__dirname, "dist"),
        // 设置入口文件的输出目录
        filename: "static/js/index.js",
        // 自动清空上次打包结果
        clean: true
    },

    // loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.s[ac]ss/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: "static/images/[hash:10][ext][query]"
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/fonts/[hash:10][ext][query]"
                }
            },
            {
                test: /\.(mp4|webm)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/media/[hash:10][ext][query]"
                }
            }
        ]
    },

    // plugins
    plugins: [],

    // mode
    mode: "development"
};