const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
		app: './src/app.js',
		main: './src/main.js'
	},

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
				use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: [
                                ['transform-class-properties', { 'spec': true }]
                            ]
                        }
                    }
                ]
            },
            {
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader?url=false',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: () => [ require('autoprefixer')('last 2 versions') ]
                                }
                            },
                            'stylus-loader'
                        ]
                    }
                )
			}
        ]
    },
    
   plugins: [
        new ExtractTextPlugin('[name].css'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         screw_ie8: true,
        //         conditionals: true,
        //         unused: true,
        //         comparisons: true,
        //         sequences: true,
        //         dead_code: true,
        //         evaluate: true,
        //         if_return: true,
        //         join_vars: true
        //     },
        //     output: {
        //         comments: false
        //     }
        // }),
        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
        // new webpack.optimize.ModuleConcatenationPlugin()
    ],

    devServer: {
		inline: true,
		contentBase: './public',
		port: 6060,
        host: '0.0.0.0',
        proxy: {
            '/': 'http://localhost:9090',
            '/admin': 'http://localhost:9090/admin'
        }
    },

    devtool: 'cheap-eval-source-map',
    // devtool: 'cheap-module-source-map',
    
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    }
};