const path = require("node:path");

module.exports = {
    // entry
    // 绝对路径
    entry: "./src/index.js",

    // output
    output: {
        // 绝对路径
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
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
            }
        ]
    },

    // plugins
    plugins: [],

    // mode
    mode: "development"
};