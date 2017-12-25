const helpers = require("./helpers");
const TSLintPlugin = require("tslint-webpack-plugin");

module.exports = {
	entry: helpers.absolutePath("/src/main.ts"),
	output: {
		path: helpers.absolutePath("/dist/js"),
		filename: "[name].js"
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: "awesome-typescript-loader"
		}],
	},
	bail: true,
	plugins: [
		new TSLintPlugin({
			files: ['./src/**/*.ts']
		})
	]
};
