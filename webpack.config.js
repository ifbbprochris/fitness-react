'use strict';
var webpack = require('webpack');
var path = require("path");
var autoprefixer =require('autoprefixer');
module.exports = {
	entry: {
		'ime': [
			path.join(__dirname,'src/app/front/index.js')
		]
	},
	output:{
		path: path.join(__dirname, 'dist'),
		filename:'[name].js',
	},
	resolve: {
		alias: {
			'action': path.join(__dirname, 'src/app/front/action/index.js'),
			'reducer': path.join(__dirname, 'src/app/front/reducer/index.js'),
			'store': path.join(__dirname, 'src/app/front/store/index.js'),
			'view': path.join(__dirname, 'src/app/front/view/index.js'),
			'comp': path.join(__dirname, 'src/component/index.js'),
			'util': path.join(__dirname, 'src/util/index.js'),
			'method': path.join(__dirname, 'src/app/front/method/index.js'),
			'ime-react': path.join(__dirname, 'src/ime-react/index.js'),
		},
	},
	module: {
		loaders: [
			{
				test: /\.less$/,
				loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!less?outputStyle=expanded&sourceMap'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=50000&name=[path][name].[ext]'
			}
		]
	},
	postcss:function(){
		return [autoprefixer];
	},
	externals:{
		'$':true
	},
	plugins:[]
};
