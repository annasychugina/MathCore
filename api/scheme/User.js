module.exports =  {
	"type": "object",
	"description": "Пользователь",

	"properties": {
		"login": {
			"description": "Login пользователя для захода на сайт",
			"type": "string",
			"minLength": 4,
 			"maxLength": 50
		},
		"password": {
			"description": "Пароль",
			"type": "password",
			"minLength": 6,
 			"maxLength": 50
		},		
		"email": {
			"description": "E-mail пользователя",
			"type": "string",
			"minLength": 6,
 			"maxLength": 50
		}
	},

	"required": ["name", "password", "email"]
};
