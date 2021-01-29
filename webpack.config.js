const currentTask = process.env.npm_lifecycle_event;
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

let sassConfig = {
	test: /\.s[ac]ss$/i,
	use: [
		// Translates CSS into CommonJS
		'css-loader',
		// Compiles Sass to CSS
		'sass-loader',
	],
};

var config = {
	entry: './src/js/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			sassConfig,
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
	],
};

if (currentTask == 'dev') {
	sassConfig.use.unshift('style-loader');
	config.output = {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'app'),
		publicPath: '/',
	};
	(config.devServer = {
		contentBase: path.join(__dirname, 'app'),
		compress: true,
		hot: true,
		port: 3000,
		historyApiFallback: true,
	}),
		(config.devtool = 'eval-source-map');
	config.mode = 'development';
}

if (currentTask == 'build') {
	config.module.rules.push({
		test: /\.js$/,
		exclude: /(node_modules)/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	});
	sassConfig.use.unshift(MiniCssExtractPlugin.loader);
	config.output = {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'docs'),
	};
	config.mode = 'production';
	config.optimization = {
		splitChunks: { chunks: 'all' },
	};
	config.plugins.push(
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' })
	);
}

module.exports = config;
