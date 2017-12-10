const helpers = require('./helpers');
const {SourceMapDevToolPlugin} = require('webpack');
const webpackConfig = require('./webpack.config.base');

testConfig = {
	...webpackConfig,
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'awesome-typescript-loader',
		}]
	},
	entry: {
		"test": helpers.absolutePath("/src/test.ts")
	},
	plugins: [
		...webpackConfig.plugins,
		new SourceMapDevToolPlugin({
			filename: null, // if no value is provided the sourcemap is inlined
			test: /\.(ts)($|\?)/i
		})
	],
	devtool: 'inline-source-map'
};

module.exports = testConfig;
