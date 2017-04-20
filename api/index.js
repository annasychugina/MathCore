module.exports = {
	'swagger': '2.0',
	'info': {
		'version': '0.0.3',
		'title': 'MathCore API',
		'description': '**MathCore**',
	},
	'basePath': '/api',
	'schemes': ['http'],
	'host': 'http://localhost:3001',

	paths: {
		'/session': require('./resources/session'),
		'/user': require('./resources/user')
	},

	definitions: {
		Session: require('./scheme/Session'),
		User: require('./scheme/User')
	},

};
