const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const terser = require('terser');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: ['./assets/js/app.js', './assets/scss/screen.scss'],
    output: {
        path: path.resolve(__dirname),
        filename: './dist/js/app.min.js',
    },
    // jQuery added
    externals: {
        jquery: 'jQuery',
    },
    devtool: 'source-map',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.woff(2)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../fonts/',
                    outputPath: './dist/fonts/',
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../img/',
                    outputPath: './dist/img/',
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
                        // options: {
                        //     sourceMap: true,
                        //     plugins: [require('lost'), require('autoprefixer')],
                        // },
                        options: {
                            postcssOptions: {
                                plugins: [require.resolve('lost'), require.resolve('autoprefixer')],
                            },
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
        new CopyPlugin({
            patterns: [
                {
                    from: './assets/img',
                    to: './dist/img',
                },
                {
                    from: './assets/js/modernizr-custom.js',
                    to: './dist/js',
                },
                {
                    from: './assets/favicons',
                    to: './dist/favicons',
                },
                {
                    from: './assets/fonts',
                    to: './dist/fonts',
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: './dist/css/screen.min.css',
        }),
        new SVGSpritemapPlugin('./assets/icons/**/*.svg', {
            output: {
                filename: './dist/img/icons.svg',
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
            failureSound: 'Basso',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new WebpackConcatPlugin({
            bundles: [
                {
                    destination: './dist/js/vendor.min.js',
                    source: './assets/js/vendor/**/*.js',
                },
            ],
        }),
        new BrowserSyncPlugin({
            // prettier-ignore
            files: [
                './../',
                './',
                '!./node_modules',
                '!./package.json',
            ],
            reloadDelay: 2,
            // https: {
            //     key: '/Users/dusan/Library/Application Support/Local/run/router/nginx/certs/dtsquared.local.key',
            //     cert: '/Users/dusan/Library/Application Support/Local/run/router/nginx/certs/dtsquared.local.crt',
            // },
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
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
            }),
        ],
    },
};
