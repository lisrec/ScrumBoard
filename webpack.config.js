const path 		= require('path')
const webpack	= require('webpack')

module.exports = {
	devServer: {
		historyApiFallback: true
	},
	devtool: 'source-map',
	entry: './src/App',
	output: {
		path: path.join(__dirname, ''),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ 
				"test": /\.jsx?$/i, 
				"loader": "babel-loader", 
				"exclude": /node_modules/, 
				"query": { 
					"presets": ["es2015", "react"],
					"plugins": ["transform-object-rest-spread"]
				},
			}
		],
	}
}