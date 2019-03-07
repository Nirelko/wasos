import {join} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import webpack, {HotModuleReplacementPlugin, NamedModulesPlugin} from 'webpack';

const configWebpack = (env = {}) => {
  let webpackConfig = {
    entry: [
      './client/index.js'
    ],
    output: {
      path: join(__dirname, './dist/server/client'),
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
      new NamedModulesPlugin()
    ],
    resolve: {
      extensions: ['.js', '.less', '.css', '.html']
    },
    node: {
      fs: 'empty'
    }
  };

  if (!env.production) {
    const clientPort = 8080;

    webpackConfig = {
      ...webpackConfig,
      mode: 'development',
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

    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new HotModuleReplacementPlugin()
    ];

    process.env.NODE_ENV = 'production';
  }
  else {
    webpackConfig = {
      ...webpackConfig,
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
      mode: 'production'
    };

    webpackConfig.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }));

    process.env.NODE_ENV = 'production';
  }

  return webpackConfig;
};

module.exports = env => configWebpack(env);