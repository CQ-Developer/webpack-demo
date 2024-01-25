const path = require("node:path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // entry
    entry: "./src/index.js",

    // output
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/index.js",
        clean: true
    },

    // loader
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            },
            {
                test: /\.s[ac]ss/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.styl$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"]
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
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, "../src")
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/html/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        })
    ],

    // mode
    mode: "production"
};