'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootdir = path.join(__dirname, '../');

module.exports = {
    entry: {
        main: path.join(rootdir, 'src/main.js')
    },
    output: {
        path: path.join(rootdir, 'dist/'),
        publicPath: '',
        filename: 'build.js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },
    module: {
        rules: [
            {test: /\.vue$/, use: ['vue-loader']},
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.(css|less)$/, use: ['style-loader', 'css-loader', 'less-loader']}
        ]
    },
    devServer: {
        port: 18888,
        hot: true,
        inline: true,
        open: true,
        publicPath: '/',
        stats: 'normal',
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: path.resolve(rootdir, 'src/index.html')
        }),
    ]
};
