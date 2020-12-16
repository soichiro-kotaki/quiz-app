const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = {
    //modeは、proudctionかdevelopment。開発時は、後者を設定しておく。後者は、jsファイルが出力される。
    mode: 'development',
    //メインとなるファイル。ここに、エントリーポイントファイルのパスを設定。このファイルから、distディレクトリののjsファイルにビルドされる。
    entry: './src/entrypoint/app.ts',
    output: {
        path: path.resolve(__dirname, './dist'),   //出力ファイルの指定。この指定方法は、絶対パスの指定。相対パスだと、ビルド時にエラーが起こる。
        filename: "javascript/[name]-[hash].js",         //出力ファイルの名前。
    },

    module: {
        rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
        },
        {
            test: /\.(css|scss|sass)$/,
            use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                },
            },
            {
                loader: 'sass-loader',
            },
            ],
        },
        {
            test: /\.jpg$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: 'image/icon.jpg',
                },
            },
            ],
        },
        {
            test: /\.pug$/,
            use: [
            {
                loader: 'html-loader',
            },
            {
                loader: 'pug-html-loader',
                options: {
                    pretty: true,
                },
            },
            ],
        },
        ],
    },
    resolve: {
        extensions: [
        '.ts', '.js',   //これを定義しないとimport文で拡張子を書く必要がある。フロントエンドの開発では、ファイルの拡張子を省略することが多いので、記載した方がトラブルに巻き込まれにくい。
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: './[name]-[hash].css',
        }),
        new HtmlWebpackPlugin({
        template: './src/templates/index.pug',
        filename: './index.html',
        }),
        new HtmlWebpackPlugin({
        template: './src/templates/content.pug',
        filename: './content.html',
        }),
        new CleanWebpackPlugin(),
    ],
}
