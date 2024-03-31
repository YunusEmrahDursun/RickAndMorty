const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { SourceMapDevToolPlugin } = require("webpack");
const path = require('path');
const package = require('./package.json');
const webpackConfig = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      styles: path.resolve(__dirname, "./src/assets/styles"),
      components: path.resolve(__dirname, "./src/pages/components"),
      store: path.resolve(__dirname, "./src/store/store"),
      hooks: path.resolve(__dirname, "./src/store/hooks"),
    } 
  },
  output: {
    filename: 'module/[contenthash:16].js?v=' + package.version,
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
		hot: false,
  },
  optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({ terserOptions: { format: { comments: false } }, extractComments: false }),
			new CssMinimizerPlugin()
		],
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module){
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return `npm/${packageName.replace('@', '')}`;
					}
				}
			}
		}
	},
  plugins: [
		new MiniCssExtractPlugin({ filename: 'css/[contenthash:16].css?v=' + package.version }),
		new HtmlWebpackPlugin({ template: './src/assets/template.html' }),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/assets/img', to: './img' },
				//{ from: './src/assets/font', to: './font' }
			]
		}),
		new SourceMapDevToolPlugin({
			filename: "[file].map"
		})
	]
}

if ( process.argv.includes('-progress') ){ webpackConfig.mode = 'production'; }

module.exports = webpackConfig;