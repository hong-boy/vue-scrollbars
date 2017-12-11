'use strict';
const webpack = require('webpack');
const path = require('path');

const rootdir = path.join(__dirname, '../');

module.exports = {
    entry: {
        main: path.join(rootdir, 'src/build.js')
    },
    output: {
        path: path.join(rootdir, 'dist/'),
        publicPath: '',
        filename: 'build.js'
    },
    module: {
        rules: [
            {test: /\.vue$/, use: ['vue-loader']},
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.(css|less)$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.(jpg|png)$/, use: ['file-loader']}
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
};
