const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          publicPath: __dirname + '/../../public/css/'
                        }
                      },
                      {
                        loader: 'css-loader',
                        options: {importLoaders: 1},
                      },
                      {
                        loader: 'postcss-loader',
                        options: {
                          config: {
                            path: __dirname + '/postcss.config.js'
                          }
                        },
                      },
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./index.html')    
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css',
        }),
        new StyleLintPlugin({
            configFile: path.resolve(__dirname, 'stylelint.config.js'),
            context: path.resolve(__dirname, './src'),
            files: '**/*.css',
            failOnError: false,
            quiet: false,
          })

    ]
};
