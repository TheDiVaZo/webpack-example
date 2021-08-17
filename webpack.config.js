const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const IsDev = process.env.NODE_ENV !== 'production'
const filename = (name, ext) => IsDev ? `${name}${ext}`:`${name}.[contenthash]${ext}`

const ScriptLoaders = () => {
    let loaders = [
        {
            loader: "babel-loader",
            options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
            }
        }
    ]
    if(IsDev) {
        loaders.push({
            loader: 'eslint-loader'
        })
    }
    return loaders
}

function plugins() {
    let plugins_array = [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !IsDev
            },
            filename: filename('index','.html')
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('[name]','.css')
        })
    ]
    return plugins_array
}
const module_exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill','./index'],
        analytics: './analytic.js'
    },
    output: {
        filename: filename('[name]','.js'),
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: filename('[name]','[ext]')
    },
    resolve: {
        extensions: [".js", ".json", ".png", ".ts", ".jsx", ".tsx"],
        alias: {
            '@models': path.resolve(__dirname, 'src/models')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
          ],
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',

            },
            {
                test: /\.m?[tj]sx?$/,
                exclude: /node_modules/,
                use: ScriptLoaders()
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    /*'style-loader'*/
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    /*'style-loader'*/
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    /*'style-loader'*/
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}

if(IsDev) {
    module_exports.devtool = 'source-map'
}

module.exports = module_exports;