const webpackConfig = require('./webpack.config.base');
const helpers = require('./helpers');

module.exports = {
	...webpackConfig,
	mode: 'production',
	entry: helpers.absolutePath('/src/main.ts'),
	output: {
		path: helpers.absolutePath('/dist'),
		filename: '[name].js',
		library: 'facratio',
		libraryTarget: 'umd'
	}
};
// webpackConfig.entry['main.min'] = helpers.absolutePath('/src/test.spec.ts');

// webpackConfig.plugins = [...webpackConfig.plugins,
//   new UglifyJsPlugin({
//     include: /\.min\.js$/,
//     minimize: true
//   }),
//   new CompressionPlugin({
//     asset: '[path].gz[query]',
//     test: /\.min\.js$/
//   }),
//   new DefinePlugin({
//     'process.env': env
//   })
// ];
