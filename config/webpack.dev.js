const path = require("node:path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 相对路径
    entry: "./src/index.js",

    // output
    output: {
        // 开发模式不需要输出
        path: undefined,
        filename: "static/js/index.js",
    },

    // loader
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(?:js|mjs|cjs)$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: "thread-loader"
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true,
                                    cacheCompression: false
                                }
                            }
                        ]
                    },
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
            }
        ]
    },

    // plugins
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            threads: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/html/index.html")
        })
    ],

    // mode
    mode: "development",

    // 开发服务器
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
    },
    // source maps
    devtool: "eval-source-map"
};