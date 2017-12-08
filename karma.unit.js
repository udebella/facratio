const webpackConfig = require('./config/webpack.config.test');

module.exports = (config) => {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai', 'sinon'],
		files: [
			'src/test.ts'
		],
		preprocessors: {
			'src/test.ts': ['webpack']
		},
		webpack: webpackConfig,
		webpackServer: {noInfo: true},
		reporters: ['mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['FirefoxHeadless'],
		customLaunchers: {
			FirefoxHeadless: {
				base: 'Firefox',
				flags: ['-headless'],
			}
		},
		mime: {
			'text/x-typescript': ['ts']
		},
		singleRun: true
	});
};
