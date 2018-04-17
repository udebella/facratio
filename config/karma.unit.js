const webpackConfig = require('./webpack.config.test');
const helpers = require('./helpers');

module.exports = (config) => {
	config.set({
		basePath: '../',
		frameworks: ['mocha', 'chai', 'sinon'],
		files: [
			helpers.absolutePath('/src/test.spec.ts')
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
		singleRun: !helpers.hasCommandLineArgument('watch')
	});
};
