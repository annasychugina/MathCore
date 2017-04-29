'use strict';

const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        app: path.resolve(__dirname, 'public', 'main.js'),
        vendor: ['babel-polyfill', 'eventsource-polyfill', './public/lib/babylon.js', './public/lib/hand.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: path.join('js', '[name].js')
    },
    module: {
        //rules: [
        loaders: [
            {
                test: /\.(s)?css/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.tmpl\.xml/,
                loader: 'fest-loader'
            },
            {
                test: /\/sw.js$/,
                loader: `file?name=${path.join('..', 'dist', '[name].[hash].js')}&publicPath=/&outputPath=/`
            }
        ]
    },
    resolve: {
        extensions: [".js", ".scss"]
    },
    resolveLoader: {
        moduleExtensions: ['-loader'],
        alias: {
            'fest-loader': path.resolve(__dirname, './fest-loader')
        }
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, "public/static", 'sky34'),
            to: path.join(__dirname, "dist/static", 'sky34')
        },
            {
                from: path.join(__dirname, "public", 'static'),
                to: path.join(__dirname, "dist", 'static')
            }
        ]),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            postcss: [precss, autoprefixer]
        }),
        new webpack.NoErrorsPlugin(),
        new HtmlPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'public/index.html')
        }),
        /*new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         filename: path.join('js', '[name].bundle.[hash].js'),
         minChunks: Infinity
         }),*/
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: false
            }
        })
    ]
};
