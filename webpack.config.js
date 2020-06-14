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
        filename: 'javascript/main.js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options:{
                            presets: [
                                ['@babel/preset-env' , { 'targets': '> 0.25%, not dead'}],
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
                test: /\.(png|jpg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'images/[name].[ext]',
                        },
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
            filename: './stylecheets/main.css',
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
