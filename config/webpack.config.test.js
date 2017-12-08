const helpers = require("./helpers");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.base');

webpackConfig.module.rules = [{
	test: /\.ts$/,
	exclude: /node_modules/,
	loader: 'awesome-typescript-loader',
	query: {
		compilerOptions: {
			inlineSourceMap: true,
			sourceMap: false,
			noEmitOnError: true
		}
	}
}];

webpackConfig.entry =  {
	"test": helpers.root("/src/test.ts")
};

webpackConfig.plugins = [...webpackConfig.plugins,
	new webpack.SourceMapDevToolPlugin({
		filename: null, // if no value is provided the sourcemap is inlined
		test: /\.(ts)($|\?)/i
	})
];

webpackConfig.devtool = 'inline-source-map';

module.exports = webpackConfig;
