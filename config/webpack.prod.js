const path = require("node:path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

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
        filename: "static/js/[name].[contenthash:10].js",
        chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
        assetModuleFilename: "static/asset/[hash:10][ext][query]",
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
                        use: [
                            {
                                loader: "thread-loader"
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                    plugins: [
                                        "@babel/plugin-transform-runtime"
                                    ]
                                }
                            }
                        ]
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
                        }
                    },
                    {
                        test: /\.(ttf|woff2?)$/,
                        type: "asset/resource"
                    },
                    {
                        test: /\.(mp4|webm)$/,
                        type: "asset/resource"
                    }
                ]
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true
            }),
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
        ],
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}.js`
        }
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
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],

    // mode
    mode: "production",
    // source maps
    devtool: "source-map"
};