const path = require('path');
const envMode = process.env.NODE_ENV || "development" //"development" | "production" 

module.exports = {
    entry: './dist/index.js',
    devtool: 'inline-source-map',
    mode: envMode,
    output: {
        path: path.resolve(__dirname, `build/${envMode}`),
        filename: 'api.bundle.js'
    },
    target: 'node',
    node: {
        __dirname: false
    },
    plugins: [ ]
};