exports.post = {
	"tags": ["session"],
	"description": "Метод позволяет пользователю авторизироваться",
	"produces":"application/json",
	"consumes":"application/json",
	"parameters": [
		{
			"in":"body",
			"name":"body",
			"required":"true",
			"schema": {
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
			}
		}
	],
	"responses": {
		"200": {
			"schema": {
				"description": "Пользователь успешно авторизирован",
				"type": "#/definitions/Session"
			}
		},
		"204": {
			"description": "Пользователь уже авторизирован"
		},
		"400": {
			"description": "Неправильный логин/пароль"
		}
	},
	"x-amples": [{
		"description": "Тестовый логин",
		"request": {
			"params": {
				"login": "test",
				"password": "123"
			}
		},
		"response": {
			"status": 200,
			"headers": {
				"content-type": "application/json"
			},
			"validator": function (res) {

				if (typeof res.name !== 'string') {
					return 'некорректный login';
				}

				if (typeof res.password !== 'string') {
					return 'некорректный пароль';
				}

				return true;
			}
		}
	}]
};