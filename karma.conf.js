const wc = require('./webpack.config.js');
module.exports = function (config) {
	//'use strict';
	var configuration = {

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			'./public/components/**/*.js',
			'./public/modules/**/*.js',
			'./public/views/**/*.js',
			'./test/**/*.spec.js',
		],

		reporters: ['progress', 'coverage'],
		preprocessors: {
			'./test/**/*.spec.js': ['webpack', 'babel'],
			'./public/components/**/*.js': ['webpack'],
			'./public/modules/**/*.js': ['webpack'],
			'./public/views/**/*.js': ['webpack'],
			
		},
		
		webpack: wc,
		
		
		webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e. 
                chunks: false
            }
        },
		
		plugins: [
            require("karma-webpack"),
			require('karma-babel-preprocessor'),
			'karma-jasmine',
            'karma-chrome-launcher',
		    'karma-coverage'
        ],

		port: 9876,
		colors: true,
		autoWatch: false,
		singleRun: false,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		browsers: ['Chrome'],

		customLaunchers: {
  Chrome_travis_ci: {
    base: 'Chrome',
    flags: ['--no-sandbox']
  }
},

		coverageReporter: {
			type: 'html',
			dir: 'public/coverage/'
		}
	};

	if(process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci'];
  }

	config.set(configuration);
};
