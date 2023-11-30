const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },{
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        open: true,
    },
};