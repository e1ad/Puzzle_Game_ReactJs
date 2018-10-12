var path = require('path');
var webpack = require('webpack');
require("babel-core/register");
require("babel-polyfill");

module.exports = {
    entry:  ['babel-polyfill',path.resolve(__dirname,'./static/app.js')],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './static/dist')
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets:['es2015','react','stage-0'],
                    plugins: ["transform-decorators-legacy", "transform-class-properties","transform-async-to-generator"] 
                }
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif)$/,
                use: ['url-loader']
            },
        ]
    },
    devtool: 'inline-source-map'
};