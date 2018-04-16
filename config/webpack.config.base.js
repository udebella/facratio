const helpers = require('./helpers');

module.exports = {
	entry: helpers.absolutePath('/src/main.ts'),
	output: {
		path: helpers.absolutePath('/dist/js'),
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	module: {
		rules: [{
			test: /\.ts$/,
			enforce: 'pre',
			exclude: /node_modules/,
			loader: 'tslint-loader',
			options: {
				emitErrors: true,
				failOnHint: true,
				fix: true
			}
		}, {
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'ts-loader'
		}],
	},
	plugins: []
};
