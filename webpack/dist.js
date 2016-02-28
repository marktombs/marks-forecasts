var path = require('path');
var webpack = require('webpack');

module.exports = {
    port: 8080,
    entry: "./src/js/application.js",
    output: {
        path: __dirname + '/../dist/assets/',
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
              test: /\.(js|jsx)$/,
              loader: "babel-loader?{'presets':['react','es2015']}",
              include: path.join(__dirname, '/../src')
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!resolve-url!sass-loader?sourceMap&outputStyle=expanded'
            },
            {
                test: /\.svg$/,
                loader: 'url-loader'
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    }
};
