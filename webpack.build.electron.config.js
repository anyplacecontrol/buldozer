const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src')

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
  };

module.exports = {
  module: {
    rules: [
        {
            test: /(\.css|\.scss|\.sass)$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ],
            include: defaultInclude
          },
          {
            test: /\.jsx?$/,
            use: [{ loader: 'babel-loader' }],
            include: defaultInclude
          },
          {
            test: /\.(?:png|jpg|svg)$/,
            loader: 'url-loader'            
          },
          {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
            include: defaultInclude
          },       
          {
            test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
            use: [
            {
                loader: 'url-loader',
                options: {
                //limit: 10000,
                mimetype: 'application/octet-stream',
                name: '[name].[ext]'
                }
            }
            ]
          },                 
    ]
  },

  target: 'electron-renderer',  
  plugins:[
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      chunkFilename: '[id].css'
    }),

    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      favicon: 'src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Note that you can add custom options here if you need to handle other custom logic in index.html
      // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
      trackJSToken: ''
    }),

   // new BabiliPlugin()

  ]

}
