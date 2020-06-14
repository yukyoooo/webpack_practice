const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',//developmentモードで出力 production:軽量モード
    devtool: 'source-map',//出力をここで書いた内容で確認可能にする
    entry: './src/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascript/[name]-[hash].js',//nameを変えキャッシュ初期化
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options:{
                            presets: [
                                ['@babel/preset-env' , { 'targets': '> 0.25%, not dead'}],
                                '@babel/preset-react',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(css|sass|scss)/,//.cssのファイルが見つかればローダー適応
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,//ローダーは下から上に
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'images/[name]-[hash].[ext]',
                            publicPath: '/',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            }
                        }
                    },
                ],
            },
            {
                test: /\.pug/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty:true,
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/[name]-[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.pug',
            filname: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/access.pug',
            filename: 'access.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/members/taro.pug',
            filename: 'members/taro.html',
        }),
        new CleanWebpackPlugin(),
    ],
}
