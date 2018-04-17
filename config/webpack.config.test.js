const helpers = require('./helpers');
const {SourceMapDevToolPlugin} = require('webpack');
const webpackConfig = require('./webpack.config.base');

testConfig = {
	...webpackConfig,
	entry: helpers.absolutePath('/src/test.spec.ts'),
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
