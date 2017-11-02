'use strict';

const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {

    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    devServer: {
        host: 'localhost',
        port: 8000,
        contentBase: __dirname,
        historyApiFallback: true
    },

    watch: NODE_ENV === "development",

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === "development" ? "cheap-inline-module-source-map" : "source-map",

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            title: 'movieDB',
            template: './src/index.html'
        })
    ],

    resolve: {
        modules: ["node_modules"],
        extensions: ["*", '.js', '.json']
    },

    resolveLoader: {
        modules: ["node_modules"],
        moduleExtensions: ["-loader"],
        extensions: ["*", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015'],
                    plugins: [
                        ["transform-runtime", {
                            "helpers": false, // defaults to true
                            "polyfill": false, // defaults to true
                            "regenerator": true, // defaults to true
                            "moduleName": "babel-runtime" // defaults to "babel-runtime"
                        }],
                        "transform-object-rest-spread"
                    ]
                }
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"}
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    }
};

if (NODE_ENV === "production") {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}