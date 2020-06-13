const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css/,//.cssのファイルが見つかればローダー適応
                use: [
                    {
                        loader: 'style-loader',//ローダーは下から上に
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
}
