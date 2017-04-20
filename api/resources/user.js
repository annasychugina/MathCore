exports.post = {
	"tags": ["user"],
	"description": "Метод создает нового пользователя",
	"produces":"application/json",
	"consumes":"application/json",
	"parameters": [
		{
			"in":"body",
			"name":"body",
			"required":"true",
			"schema": {
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
			 }
		}
	],
	"responses": {
		"200": {
			"schema": {
				"description": "Пользователь создан",
				"type": "#/definitions/User"
			}
		},
		"204": {
			"description": "Пользователь уже авторизован",
		},
		"400": {
			"description": "Одно из полей пустое",
		},
		"403": {
			"description": "Логин/email уже используются или что-то еще пошло не так"
		}
	},
	"x-amples": [{
		"description": "создание тестового пользователя",
		"request": {
			"params": {
				"login": "test",
				"password": "123",
				"email":"test@test"
			}
		},
		"response": {
			"status": 200,
			"headers": {
				"content-type": "application/json"
			},
			"validator": function (res) {

				if (typeof res.login !== 'string') {
					return 'некорректный login';
				}

				if (typeof res.password !== 'string') {
					return 'некорректный пароль';
				}

				if (typeof res.email !== 'string') {
					return 'некорректный e-mail';
				}

				return true;
			}
		}
	}]
};