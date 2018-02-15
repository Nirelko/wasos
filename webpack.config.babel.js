import {join} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, {HotModuleReplacementPlugin, NamedModulesPlugin} from 'webpack';

const clientPort = 8080;

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: join(__dirname, './server/client'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 10000}
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|ico|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      favicon: './client/assests/fav.ico',
      inject: 'body'
    }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js', '.less', '.css', '.html']
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    port: clientPort,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000'
      }
    }
  }
};