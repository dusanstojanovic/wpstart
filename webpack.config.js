const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const terser = require('terser');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
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
    mode: 'production',
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
                    publicPath: '../images/',
                    outputPath: './assets/images/',
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
        new CopyPlugin({
            patterns: [
                {
                    from: './images',
                    to: './assets/images',
                },
                {
                    from: './javascript/modernizr-custom.js',
                    to: './assets/js',
                },
                {
                    from: './favicons',
                    to: './assets/favicons',
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: './assets/css/screen.min.css',
        }),
        new SVGSpritemapPlugin('./icons/**/*.svg', {
            output: {
                filename: './assets/images/icons.svg',
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
                    destination: './assets/js/plugins.js',
                    source: './javascript/plugins/**/*.js',
                    transforms: {
                        after: code => {
                            return terser.minify(code).code;
                        },
                    },
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
            reloadDelay: 1,
            // https: {
            //     key: '/Users/dusan/Library/Application Support/Local/run/router/nginx/certs/ednew.local.key',
            //     cert: '/Users/dusan/Library/Application Support/Local/run/router/nginx/certs/ednew.local.crt',
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
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true,
                            },
                        },
                    ],
                },
            }),
        ],
    },
};
