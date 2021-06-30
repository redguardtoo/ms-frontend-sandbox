// So you need prepare follow files:
//   - frontend/index.js (@see react-indexjs.yasnippet)
//   - frontend/index.template.ejs (used by HtmlWebpackPlugin, @see html5-webpack.yasnippet)
//   - package.json
//   - webpack.config.js

if(!process.env.NODE_ENV) {
  // make webpack-dev-server happy to run the `webpack`
  process.env.NODE_ENV = 'development';
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

function getBundleJSFileName() {
  return (process.env.NODE_ENV === 'production'? '[id].js':'[name].js');
}

function getWebRootDir(child) {
  return process.env.NODE_ENV === 'development'? child: '' + child;
}

function getDeploymentLocalDistDir() {
  return process.env.NODE_ENV === 'development'? 'frontend-dist/js': 'src/main/resources/static/js';
}

function getFilesToCopy() {
  return {
    patterns: [
      {from: 'node_modules/bootstrap/dist/css/*', to: '../css/'},
    ],
  };
}

function getWebpackPlugins() {
  const arr = [
    new CopyWebpackPlugin(getFilesToCopy()),
    // full moment.js is too big. @see https://github.com/moment/moment/issues/2416
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': process.env.NODE_ENV === 'production'?'"production"':'"development"'}
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.resolve(__dirname, 'frontend/index.template.ejs'),
      inject: 'body',
      hash: process.env.NODE_ENV === 'production', /* web-dev-server does not cache js */
      cssDir: getWebRootDir('/css')
    })
    // new webpack.optimize.DedupePlugin() // @see https://github.com/webpack/webpack/issues/1982
  ];

  // backend developers prefer debugging non-uglified js code during integration
  if(process.env.NODE_ENV === 'production' && process.env.DEPLOYMENT !== 'staging') {

    arr.push(
      new webpack.optimize.UglifyJsPlugin({
        // Don't beautify output (enable for neater output)
        beautify: false,
        // Eliminate comments
        comments: false,
        screw_ie8: true,
        // Compression specific options
        compress: {
          warnings: false,
          // Drop console statements
          drop_console: true
        },
        // Mangling specific options
        mangle: {
          // Don't mangle function names
          // keep_fnames: true // about 8% js file size increase
        }
      })
    );
  }
  return arr;
}

const rules = [
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: "file-loader"
  }, {
    test: /\.css$/,
    include: /node_modules/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },
    ],
  }, {
    test: /\.jsx*$/,
    exclude: [/node_modules/, /.+\.config.js/],
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react',]
      },
    },
  }
];

module.exports = {
  // we don't need source map in dev version because code is NOT uglified
  entry: {
    app:'./frontend/index.js',
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    path: path.resolve(__dirname, getDeploymentLocalDistDir()),
    filename: getBundleJSFileName(),
    publicPath: getWebRootDir('/js/')
  },
  devServer: {
    historyApiFallback: true,
    compress: true // less page loading time
  },
  plugins: getWebpackPlugins(),
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, './frontend/components'),
      path.resolve(__dirname, './frontend'),
      'node_modules',
    ],
  },

  module: {
    rules,
  },
};
// Local Variables:
// coding: utf-8
// tab-width: 2
// js-indent-level: 2
// js2-basic-offset: 2
// End:
// vim: set fs=javascript fenc=utf-8 et ts=2 sts=2 sw=2
