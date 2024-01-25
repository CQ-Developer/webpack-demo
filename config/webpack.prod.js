const path = require("node:path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 封装通用的样式loader函数
function getStyleLoader(loader) {
    let arr = [
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
        },
        loader
    ];
    return arr.filter(Boolean);
}

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
                oneOf: [
                    {
                        test: /\.(?:js|mjs|cjs)$/,
                        exclude: /node_modules/,
                        use: ["babel-loader"]
                    },
                    {
                        test: /\.css$/,
                        use: getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoader("less-loader")
                    },
                    {
                        test: /\.s[ac]ss/,
                        use: getStyleLoader("sass-loader")
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader("stylus-loader")
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

    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },

    // plugins
    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/html/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        })
    ],

    // mode
    mode: "production",
    // source maps
    devtool: "source-map"
};