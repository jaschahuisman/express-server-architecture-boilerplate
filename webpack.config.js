const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	target: 'node',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@common': path.resolve(__dirname, 'src/common'),
			'@types': path.resolve(__dirname, 'src/types'),
		},
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'index.js',
	},
	externals: nodeModules,
	plugins: [
		new webpack.IgnorePlugin(/\.(css|less)$/),
		new webpack.BannerPlugin('require("source-map-support").install();', {
			raw: true,
			entryOnly: false,
		}),
	],
	devtool: 'source-map',
};
