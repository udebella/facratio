const helpers = require("./helpers");

module.exports = {
	entry: {
		"main": helpers.root("/src/main.ts")
	},
	output: {
		path: helpers.root("/dist/js"),
		filename: "[name].js"
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{test: /\.ts$/, exclude: /node_modules/, enforce: 'pre', loader: 'tslint-loader'},
			{test: /\.ts$/, exclude: /node_modules/, loader: "awesome-typescript-loader"}
		],
	},
	plugins: []
};
