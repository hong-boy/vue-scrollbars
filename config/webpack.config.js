'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootdir = path.join(__dirname, '../');

module.exports = {
    entry: {
        // main: ['babel-polyfill', path.join(rootdir, 'src/main.js')]
        main: [path.join(rootdir, 'src/main.js')]
    },
    module: {
        rules: [
            {test: /\.vue$/, use: ['vue-loader']},
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.(css|less)$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.(jpg|png)$/, use: ['file-loader']}
        ]
    },
    devServer: {
        port: 18888,
        // hot: true,
        inline: true,
        open: false,
        publicPath: '/',
        stats: 'normal',
    },
    plugins: [
        new HtmlWebpackPlugin({
            // inject: true,
            filename: 'index.html',
            template: path.resolve(rootdir, 'src/index.html')
        }),
    ]
};
