const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: ['./javascript/app.js', './scss/screen.scss'],
    output: {
        filename: './assets/js/app.min.js',
        path: path.resolve(__dirname),
    },
    // jQuery added
    externals: {
        jquery: 'jQuery',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.woff(2)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../fonts/',
                    outputPath: '/assets/fonts/',
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../img/',
                    outputPath: '/assets/img/',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
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
                            sourceMap: true,
                            plugins: [require('lost'), require('autoprefixer')],
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
        new CopyPlugin([
            {
                from: './images',
                to: './assets/img',
            },
        ]),
        new MiniCssExtractPlugin({
            filename: './assets/css/screen.min.css',
        }),
        new SVGSpritemapPlugin('./icons/**/*.svg', {
            output: {
                filename: './assets/img/icons.svg',
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
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
                extractComments: true,
                terserOptions: {
                    ecma: 5,
                    ie8: false,
                    compress: true,
                    warnings: false,
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
};
