const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}, {
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					},
					"postcss-loader"
				]
			}],
	},
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "../src/components/"),
			"@interfaces": path.resolve(__dirname, "../src/interfaces/"),
			"@modes": path.resolve(__dirname, "../src/modes/"),
			"@styles": path.resolve(__dirname, "../src/styles/"),
			"@utilities": path.resolve(__dirname, "../src/utilities/"),
		},
		extensions: [".tsx", ".ts", ".js"],
	},
	optimization: {
		minimizer: [
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComments: {
								removeAll: true,
							}
						}
					]
				}
			}),
		],
		minimize: true
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "react-code-input-v2.css"
		}),
		new HtmlWebpackPlugin({
			title: "React Code Input V2",
			template: "./public/index.html",
		}),
	],
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "../dist"),
		clean: true
	},
};
