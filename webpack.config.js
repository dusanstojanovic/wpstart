const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: ['./js/src/app.js', './css/src/screen.scss'],
    output: {
        filename: './js/build/app.min.js',
        path: path.resolve(__dirname),
    },
    // jQuery added
    externals: {
        jquery: 'jQuery',
    },
    // Source Maps for css (doesnt work properly)
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.woff(2)?$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('lost'),
                                require('autoprefixer')({
                                    browsers: ['> 1%', 'last 2 versions'],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/build/screen.min.css',
        }),
        new SVGSpritemapPlugin('./img/src-icons/**/*.svg', {
            output: {
                filename: './img/icons.svg',
                svgo: true,
                svg4everybody: false,
            },
            sprite: {
                prefix: false,
            },
        }),
        new WebpackBuildNotifierPlugin({
            title: 'Webpack Build',
            suppressSuccess: false,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new BrowserSyncPlugin({
            // prettier-ignore
            files: [
                './../',
                './',
                '!./node_modules',
                '!./package.json',
            ],
            reloadDelay: 0,
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
};
