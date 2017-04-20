module.exports =  {
	"type": "object",
	"description": " Авторизация пользователя",

	"properties": {
		"name": {
			"description": "Имя пользователя",
			"type": "string",
			"minLength": 4,
 			"maxLength": 50
		},
		"password": {
			"description": "Пароль",
			"type": "password",
			"minLength": 6,
 			"maxLength": 50
		}
	},

	"required": ["name", "password"]
};
