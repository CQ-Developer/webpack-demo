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
        rules: []
    },
    
    // plugins
    plugins: [],
    
    // mode
    mode: "development"
};