import View from "../modules/view";
import Form from "../components/form/form";
import Menu from "../components/menu/menu";
import User from "../models/user";
import Router from "../modules/router";
import Button from "../components/button/button";

export default class RegistrationView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.js-welcome-panel');
		//this.handleClick = this.handleClick.bind(this);
		var options = {
			el: this._el,
			data: {
				title: 'Registration',
				fields: [
					{
						name: 'login',
						type: 'text',
						placeholder: 'Your login here'
					},
					{
						name: 'email',
						type: 'email',
						placeholder: 'Your email here'
					},
					{
						name: 'password',
						type: 'password',
						placeholder: 'Your password here'
					},
					{
						name: 'password',
						type: 'password',
						placeholder: 'Repeat your password'
					}
				],
				controls: [
					{
						text: 'Sign up',
						attrs: {
							type: 'submit',
							class: 'btnsignup',
						}
					},

					{
						text: 'Back',
						attrs: {
							type: 'button',
							class: 'btnback',
							id: 'btnback',
							//onclick: this.handleClick
						},
					}
				]
			}
		};
		this.form = new Form(options);
		this.init();
		this.show();
		this.submitFunc = this.onSubmit.bind(this);
	}

	onSubmit(event){
		event.preventDefault();
		let userData = this.form.getFormData();
		const user = new User(userData);

		if(this.form.isValid()){
			user.send('POST', userData).then(
				() => {
					document.dispatchEvent( new CustomEvent("updateMenu", {
						detail:{
							isAuthorized: true
						}
					}) );

					(new Router).go('/scores');
				},
				() => {
					window.alert("Такой пользователь уже существует");
				}
			)
		}
	}


	init(options = {}) {
		// this.menu = new Menu();
		// this.menu._updateHtml();
	}
	// handleClick(){
	// 	(new Router).go('/');
	// }
	handleClick(){
	   (new Router).go('/');
	}

	pause(options = {}) {
		this.form.hide();
		this.form.stop('submit', this.submitFunc);
		this.hide();
		// let button = document.getElementById('btnback');
		// button.onclick = this.handleClick;
	}

	resume(options = {}) {
		this._el.setAttribute('hidden', false);
		this.form.render();
		this.form.on('submit', this.submitFunc);
		this.show();
		let button = document.getElementById('btnback');
		button.onclick = this.handleClick;
	}
}
