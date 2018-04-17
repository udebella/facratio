module.exports = {
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
