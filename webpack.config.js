const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
// const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = {
  //modeは、proudctionかdevelopment。開発時は、後者を設定しておく。後者は、jsファイルが出力される。
  mode: 'development',
  //メインとなるファイル。ここに、エントリーポイントファイルのパスを設定。このファイルから、distディレクトリののjsファイルにビルドされる。
  entry: './src/typescript/app.ts',
  output: {
    path: path.resolve(__dirname, './dist'),   //出力ファイルの指定。この指定方法は、絶対パスの指定。相対パスだと、ビルド時にエラーが起こる。
    filename: "main.js",         //出力ファイルの名前。
  },

  module: {
    rules: [
      {//拡張子が.tsの場合/~/で囲む。正しく拡張子を読み込むための正規表現
        test: /\.ts$/,
        use: 'ts-loader',//tsファイルをwebpackでコンパイルするためのツール。ターミナルからnpmコマンドでインストール。
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
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: './index.html',
    }),
    new CleanWebpackPlugin(),
  ],
}
