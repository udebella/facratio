const helpers = require('./helpers');
const {SourceMapDevToolPlugin} = require('webpack');
const webpackConfig = require('./webpack.config.base');

testConfig = {
	...webpackConfig,
	entry: helpers.absolutePath('/src/test.spec.ts'),
	module: {
		rules: [
			...webpackConfig.module.rules,
			{
				test: /\.ts$/,
				enforce: "post",
				loader: "istanbul-instrumenter-loader",
				exclude: [
					"node_modules",
					/\.spec\.ts$/
				],
				query: {
					esModules: true
				}
			}
		]
	},
	plugins: [
		...webpackConfig.plugins,
		new SourceMapDevToolPlugin({
			filename: null, // if no value is provided the sourcemap is inlined
			test: /\.(ts)($|\?)/i
		})
	],
	devtool: 'inline-source-map',
	mode: 'development'
};

module.exports = testConfig;
