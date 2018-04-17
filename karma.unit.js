const webpackConfig = require('./config/webpack.config.test');

module.exports = (config) => {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai', 'sinon'],
		files: [
			'src/test.spec.ts'
		],
		preprocessors: {
			'src/test.spec.ts': ['webpack']
		},
		webpack: webpackConfig,
		webpackServer: {noInfo: true},
		reporters: ['mocha', 'coverage-istanbul'],
		coverageIstanbulReporter: {
			reports: [ 'html', 'text-summary' ],
			dir: 'coverage',
			fixWebpackSourcePaths: true
		},
		port: 9876,
		colors: true,
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
