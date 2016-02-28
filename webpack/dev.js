var path = require('path');
var webpack = require('webpack');

var publicPath = "/assets/";

var srcPath = path.join(__dirname, '/../src');

module.exports = {
    port: 8080,
    entry: [
      'webpack-hot-middleware/client',
      './src/js/application.js'
    ],
    devtool: 'eval',
    cache: true,
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: 'bundle.js',
        publicPath: publicPath
    },
    devServer: {
      contentBase: './src/',
      historyApiFallback: true,
      hot: true,
      port: 8080,
      publicPath: publicPath,
      noInfo: false,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader?{'presets':['react','es2015']}"],
                include: path.join(__dirname, '/../src')
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.less/,
                loader: 'style!css!resolve-url!less'
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000" }

        ]
    }
};
