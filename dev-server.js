#!/usr/bin/env node

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 添加开发服务器配置
for(var entryKey in webpackConfig.entry){
  webpackConfig.entry[entryKey].push('webpack-hot-middleware/client');
}
//webpackConfig.output.publicPath = '/dist/';
webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      "filename": 'index.html',
      "template": 'index.html',
      "commonjs": '',
      "inject": true,
      "chunks": ['ime'],
      "hash": true
    })
);
webpackConfig.devtool = 'cheap-module-eval-source-map';


var app = express();
var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/resource', express.static('src/resource'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8081, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8081');
});
