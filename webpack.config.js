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
                // 指定图片的输出目录和文件名
                // [hash:10]表示文件的hash值，10表示只取hash值的前10位
                // [ext]文件的扩展名
                // [query]请求的路径查询参数
                generator: {
                    filename: "static/images/[hash:10][ext][query]"
                }
            }
        ]
    },

    // plugins
    plugins: [],

    // mode
    mode: "development"
};